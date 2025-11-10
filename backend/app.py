from flask import Flask
from flask_cors import CORS
import mysql.connector
from config import Config
from routes.usuarios import usuarios_bp
from routes.auth import auth_bp  # <-- Importa auth

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

# Registrar blueprints
app.register_blueprint(usuarios_bp, url_prefix="/usuarios")
app.register_blueprint(auth_bp, url_prefix="/auth")  # <-- Registrar login

# Ruta de prueba para verificar la conexión
@app.route("/test-db")
def test_db():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT NOW();")
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        return {"status": "ok", "time": str(result[0])}
    except mysql.connector.Error as err:
        return {"status": "error", "message": str(err)}

if __name__ == "__main__":
    app.run(port=Config.PORT, debug=True)
