from flask import Blueprint, jsonify
import mysql.connector
from config import Config

usuarios_bp = Blueprint("usuarios", __name__)

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

@usuarios_bp.route("/", methods=["GET"])
def listar_usuarios():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, nombre, apellido, correo, rol_id, estado FROM usuarios;")
        usuarios = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"status": "ok", "usuarios": usuarios})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)})
