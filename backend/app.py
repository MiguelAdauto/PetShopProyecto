from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from config import Config

from routes.auth import auth_bp
from routes.usuarios import usuarios_bp
from routes.productos import productos_bp
from routes.categorias import categorias_bp
from routes.subcategorias import subcategorias_bp

app = Flask(__name__)
CORS(app)

# Registrar blueprints
app.register_blueprint(categorias_bp, url_prefix="/categorias")
app.register_blueprint(usuarios_bp, url_prefix="/usuarios")
app.register_blueprint(productos_bp, url_prefix="/productos")
app.register_blueprint(auth_bp, url_prefix="/auth") 
app.register_blueprint(subcategorias_bp, url_prefix="/subcategorias")

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
