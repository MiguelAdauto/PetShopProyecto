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

# 🔹 Listar subcategorías (todas, sin filtro)
@subcategorias_bp.route("/", methods=["GET"])
def listar_subcategorias():
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT id, nombre, descripcion FROM subcategorias")
        subcategorias = cursor.fetchall()

        return jsonify({"status": "ok", "subcategorias": subcategorias})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# 🔹 Agregar subcategoría (SIN categoria_id)
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
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# 🔹 Editar subcategoría (SIN categoria_id)
@subcategorias_bp.route("/<int:id>", methods=["PUT"])
def editar_subcategoria(id):
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
            "UPDATE subcategorias SET nombre=%s, descripcion=%s WHERE id=%s",
            (nombre, descripcion, id)
        )
        conn.commit()

        return jsonify({"status": "ok", "message": "Subcategoría actualizada exitosamente"})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


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
        if cursor:
            cursor.close()
        if conn:
            conn.close()
