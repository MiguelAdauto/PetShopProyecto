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

# 🔹 Listar subcategorías
@subcategorias_bp.route("/", methods=["GET"])
def listar_subcategorias():
    categoria_id = request.args.get("categoria_id")

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        if categoria_id:
            try:
                categoria_id = int(categoria_id)
            except ValueError:
                return jsonify({"status": "error", "message": "categoria_id debe ser un número"}), 400

            # 🔹 JOIN con tabla intermedia
            cursor.execute("""
                SELECT s.id, s.nombre, s.descripcion
                FROM subcategorias s
                JOIN categoria_subcategoria cs ON s.id = cs.subcategoria_id
                WHERE cs.categoria_id = %s
            """, (categoria_id,))
        else:
            cursor.execute("SELECT id, nombre, descripcion FROM subcategorias")

        subcategorias = cursor.fetchall()
        cursor.close()
        conn.close()

        return jsonify({"status": "ok", "subcategorias": subcategorias})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
