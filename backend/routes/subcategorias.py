from flask import Blueprint, request, jsonify
import mysql.connector
from config import Config

subcategorias_bp = Blueprint("subcategorias", __name__)

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

# 🔹 Cambiar visibilidad de subcategoría
@subcategorias_bp.route("/visibilidad/<int:id>", methods=["PUT"])
def cambiar_visibilidad(id):
    try:
        data = request.get_json(force=True)
    except:
        return jsonify({"status": "error", "message": "No se pudo leer JSON"}), 400

    visible = data.get("visible")
    if visible not in [0, 1]:
        return jsonify({"status": "error", "message": "Valor visible inválido"}), 400

    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("UPDATE subcategorias SET visible=%s WHERE id=%s", (visible, id))
        conn.commit()
        return jsonify({"status": "ok", "message": "Visibilidad actualizada"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# Listar subcategorías visibles
@subcategorias_bp.route("/visibles", methods=["GET"])
def listar_subcategorias_visibles():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, nombre, descripcion FROM subcategorias WHERE visible = 1")
        data = cursor.fetchall()
        return jsonify({"status": "ok", "subcategorias": data})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# Listar todas las subcategorías
@subcategorias_bp.route("/", methods=["GET"])
def listar_subcategorias():
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, nombre, descripcion, visible FROM subcategorias")
        subcategorias = cursor.fetchall()
        return jsonify({"status": "ok", "subcategorias": subcategorias})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# 🔹 Agregar subcategoría
@subcategorias_bp.route("/", methods=["POST"])
def agregar_subcategoria():
    try:
        data = request.get_json(force=True)
    except:
        return jsonify({"status": "error", "message": "No se pudo leer JSON"}), 400

    nombre = data.get("nombre", "").strip()
    descripcion = data.get("descripcion", "").strip()
    if not nombre:
        return jsonify({"status": "error", "message": "El nombre es obligatorio"}), 400

    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO subcategorias (nombre, descripcion) VALUES (%s, %s)",
            (nombre, descripcion)
        )
        conn.commit()
        new_id = cursor.lastrowid
        return jsonify({"status": "ok", "message": "Subcategoría agregada exitosamente", "id": new_id}), 201
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# 🔹 Editar subcategoría
@subcategorias_bp.route("/<int:id>", methods=["PUT"])
def editar_subcategoria(id):
    try:
        data = request.get_json(force=True)
    except:
        return jsonify({"status": "error", "message": "No se pudo leer JSON"}), 400

    nombre = data.get("nombre", "").strip()
    descripcion = data.get("descripcion", "").strip()
    visible = data.get("visible")

    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE subcategorias SET nombre=%s, descripcion=%s, visible=%s WHERE id=%s",
            (nombre, descripcion, visible, id)
        )
        conn.commit()
        return jsonify({"status": "ok", "message": "Subcategoría actualizada"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# 🔹 Eliminar subcategoría
@subcategorias_bp.route("/<int:id>", methods=["DELETE"])
def eliminar_subcategoria(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM subcategorias WHERE id=%s", (id,))
        conn.commit()
        return jsonify({"status": "ok", "message": "Subcategoría eliminada correctamente"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# 🔹 -----------------------------
# 🔹 NUEVO: Subcategorías por vendedor (selección permanente)
# 🔹 -----------------------------

# Obtener subcategorías seleccionadas por un vendedor
@subcategorias_bp.route("/vendedor/<int:vendedor_id>", methods=["GET"])
def get_subcategorias_vendedor(vendedor_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT s.id, s.nombre 
            FROM subcategorias s
            JOIN subcategorias_vendedor sv ON s.id = sv.subcategoria_id
            WHERE sv.vendedor_id = %s
        """, (vendedor_id,))
        data = cursor.fetchall()
        return jsonify({"status": "ok", "subcategorias": data})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# Guardar selección de subcategorías de un vendedor
@subcategorias_bp.route("/vendedor/<int:vendedor_id>", methods=["POST"])
def set_subcategorias_vendedor(vendedor_id):
    try:
        data = request.get_json(force=True)
        subcategorias = data.get("subcategorias", [])  # lista de ids
        if len(subcategorias) > 5:
            return jsonify({"status": "error", "message": "Solo se pueden seleccionar hasta 5 subcategorías"}), 400
    except:
        return jsonify({"status": "error", "message": "JSON inválido"}), 400

    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        # Borrar selección anterior
        cursor.execute("DELETE FROM subcategorias_vendedor WHERE vendedor_id = %s", (vendedor_id,))
        # Insertar nuevas
        for sub_id in subcategorias:
            cursor.execute(
                "INSERT INTO subcategorias_vendedor (vendedor_id, subcategoria_id) VALUES (%s, %s)",
                (vendedor_id, sub_id)
            )
        conn.commit()
        return jsonify({"status": "ok", "message": "Subcategorías guardadas"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()
