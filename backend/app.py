import os
from flask import Flask, jsonify, send_from_directory
from flask import send_from_directory
from flask_cors import CORS
import mysql.connector
import urllib.parse
from config import Config

from routes.auth import auth_bp
from routes.usuarios import usuarios_bp
from routes.productos import productos_bp
from routes.categorias import categorias_bp
from routes.subcategorias import subcategorias_bp
from routes.ventas import ventas_bp
from routes.pdf_routes import pdf_bp
from routes.cierres_routes import cierres_bp


app = Flask(__name__)
CORS(app)

# Definir la ruta absoluta de la carpeta uploads
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

# Registrar blueprints
app.register_blueprint(categorias_bp, url_prefix="/categorias")
app.register_blueprint(usuarios_bp, url_prefix="/usuarios")
app.register_blueprint(productos_bp, url_prefix="/productos")
app.register_blueprint(auth_bp, url_prefix="/auth") 
app.register_blueprint(subcategorias_bp, url_prefix="/subcategorias")
app.register_blueprint(ventas_bp, url_prefix="/ventas")
app.register_blueprint(pdf_bp)
app.register_blueprint(cierres_bp)


# Ruta para servir imágenes
@app.route("/uploads/<path:filename>")
def subir_archivo(filename):
    file_path = os.path.join(app.root_path, "uploads", filename)
    if not os.path.exists(file_path):
        return jsonify({"status": "error", "message": f"Archivo '{filename}' no encontrado"}), 404
    return send_from_directory(os.path.join(app.root_path, "uploads"), filename)

# Ruta de prueba para verificar la conexión
@app.route("/test-db")
def test_db():
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(
            host=Config.MYSQL_HOST,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            database=Config.MYSQL_DATABASE
        )
        cursor = conn.cursor()
        cursor.execute("SELECT NOW();")
        result = cursor.fetchone()
        return jsonify({"status": "ok", "time": str(result[0])})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)})
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    app.run(port=Config.PORT, debug=True)
