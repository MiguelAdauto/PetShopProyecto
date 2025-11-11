from flask import Blueprint, jsonify
import mysql.connector
from config import Config

categorias_bp = Blueprint("categorias", __name__, url_prefix="/categorias")

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DATABASE
    )

@categorias_bp.route("/", methods=["GET"])
def get_categorias():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, nombre FROM categorias")
        categorias = cursor.fetchall()
        return jsonify(categorias)
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
