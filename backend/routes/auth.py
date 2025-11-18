from flask import Blueprint, request, jsonify
import mysql.connector
from config import Config

auth_bp = Blueprint("auth", __name__)

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    correo = data.get("correo")
    contrasena = data.get("contrasena")

    if not correo or not contrasena:
        return jsonify({"status": "error", "message": "Correo y contraseña son obligatorios"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT u.id, u.nombre, u.apellido, u.correo, u.imagen, r.nombre AS rol
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.correo = %s AND u.contrasena = %s AND u.estado = 1
            """,
            (correo, contrasena)
        )
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            # Normalizamos los roles
            role_backend = user["rol"].lower()  # 'admin' o 'vendedor'
            return jsonify({
                "status": "ok",
                "user": {
                    "id": user["id"],
                    "nombre": user["nombre"],
                    "apellido": user["apellido"],
                    "correo": user["correo"],
                    "imagen": user.get("imagen", ""),
                    "rol": role_backend
                }
            })
        else:
            return jsonify({"status": "error", "message": "Credenciales incorrectas"}), 401

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500