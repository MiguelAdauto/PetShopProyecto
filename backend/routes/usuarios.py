import os
from flask import Blueprint, request, jsonify
import mysql.connector
from config import Config

usuarios_bp = Blueprint("usuarios", __name__)

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

# Ruta de uploads
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(os.path.dirname(BASE_DIR), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@usuarios_bp.route("/rol/<rol_nombre>", methods=["GET"])
def obtener_usuario_por_rol(rol_nombre):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT u.id, u.nombre, u.apellido, u.telefono, u.correo,
                   u.imagen, r.nombre AS rol, u.dni, u.estado
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE r.nombre = %s AND u.estado = 1
            LIMIT 1
        """, (rol_nombre,))

        usuario = cursor.fetchone()

        if usuario:
            return jsonify({"status": "ok", "usuario": usuario})
        else:
            return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()

@usuarios_bp.route("/<int:id>/estado", methods=["PATCH"])
def cambiar_estado_usuario(id):
    data = request.json
    nuevo_estado = data.get("estado")
    if nuevo_estado is None:
        return jsonify({"status": "error", "message": "Estado no proporcionado"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("UPDATE usuarios SET estado = %s WHERE id = %s", (nuevo_estado, id))
        conn.commit()

        return jsonify({"status": "ok", "message": "Estado actualizado", "nuevo_estado": nuevo_estado})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()


# ---------------------------------------------------------
# LISTAR USUARIOS
# ---------------------------------------------------------
@usuarios_bp.route("/", methods=["GET"])
def listar_usuarios():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                u.id,
                u.nombre,
                u.apellido,
                u.telefono,
                u.correo,
                u.imagen,
                u.rol_id,
                r.nombre AS rol,
                u.dni,
                u.estado
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id;
        """)

        usuarios = cursor.fetchall()

        return jsonify({"status": "ok", "usuarios": usuarios})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()


# ---------------------------------------------------------
# AGREGAR USUARIO
# ---------------------------------------------------------
@usuarios_bp.route("/", methods=["POST"])
def agregar_usuario():
    data = request.form
    imagen_file = request.files.get("imagen")

    required = ["nombre", "apellido", "telefono", "correo", "rol_id", "dni", "contrasena"]
    if not all(field in data and data[field] for field in required):
        return jsonify({"status": "error", "message": "Faltan campos obligatorios"}), 400

    imagen_filename = None
    if imagen_file:
        imagen_filename = imagen_file.filename
        imagen_file.save(os.path.join(UPLOAD_FOLDER, imagen_filename))

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO usuarios 
            (nombre, apellido, telefono, correo, rol_id, dni, contrasena, imagen, estado)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 1)
        """, (
            data["nombre"], data["apellido"], data["telefono"],
            data["correo"], data["rol_id"], data["dni"],
            data["contrasena"], imagen_filename
        ))

        conn.commit()

        return jsonify({"status": "ok", "message": "Usuario agregado correctamente"})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()


# ---------------------------------------------------------
# EDITAR USUARIO
# ---------------------------------------------------------
@usuarios_bp.route("/<int:id>", methods=["PUT"])
def editar_usuario(id):
    data = request.form
    imagen_file = request.files.get("imagen")

    imagen_filename = None
    if imagen_file:
        imagen_filename = imagen_file.filename
        imagen_file.save(os.path.join(UPLOAD_FOLDER, imagen_filename))

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE usuarios
            SET nombre=%s,
                apellido=%s,
                telefono=%s,
                rol_id=%s,
                imagen=COALESCE(%s, imagen)
            WHERE id=%s
        """, (
            data.get("nombre"),
            data.get("apellido"),
            data.get("telefono"),
            data.get("rol_id"),
            imagen_filename,
            id
        ))

        conn.commit()

        return jsonify({"status": "ok", "message": "Usuario actualizado"})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()


# ---------------------------------------------------------
# ELIMINAR (DESACTIVAR) USUARIO
# ---------------------------------------------------------
@usuarios_bp.route("/<int:id>", methods=["DELETE"])
def eliminar_usuario(id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("UPDATE usuarios SET estado = 0 WHERE id = %s", (id,))
        conn.commit()

        return jsonify({"status": "ok", "message": "Usuario eliminado"})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()
