from flask import Blueprint, request, jsonify
import mysql.connector
from config import Config
from datetime import datetime

cierres_bp = Blueprint("cierres", __name__, url_prefix="/cierres")

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

# 🔹 Listar cierres mensuales
@cierres_bp.route("/listar", methods=["GET"])
def listar_cierres():
    conn = cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM cierres_mensuales ORDER BY anio DESC, mes DESC")
        cierres = cursor.fetchall()
        return jsonify({"status": "ok", "cierres": cierres})
    except mysql.connector.Error as err:
        print("Error listar_cierres:", err)
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# 🔹 Generar cierre mensual
@cierres_bp.route("/generar", methods=["POST"])
def generar_cierre():
    try:
        data = request.get_json(force=True)
        mes = int(data.get("mes"))
        anio = int(data.get("anio"))
        vendedor_id = int(data.get("vendedor_id"))
    except (TypeError, ValueError):
        return jsonify({"status": "error", "message": "JSON inválido o faltan datos"}), 400

    conn = cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Verificar si ya existe el cierre
        cursor.execute(
            "SELECT COUNT(*) AS total FROM cierres_mensuales WHERE mes=%s AND anio=%s AND vendedor_id=%s",
            (mes, anio, vendedor_id)
        )
        if cursor.fetchone()["total"] > 0:
            return jsonify({"status": "error", "message": "Cierre ya generado para este mes"}), 400

        # Calcular total y cantidad de ventas del mes
        cursor.execute(
            """
            SELECT 
                COUNT(*) AS cantidad_ventas, 
                IFNULL(SUM(total), 0) AS total_ventas
            FROM boleta_venta
            WHERE vendedor_id=%s AND MONTH(fecha)=%s AND YEAR(fecha)=%s
            """,
            (vendedor_id, mes, anio)
        )
        resultado = cursor.fetchone()
        cantidad_ventas = resultado["cantidad_ventas"]
        total_ventas = float(resultado["total_ventas"])

        # Insertar cierre en la tabla
        cursor.execute(
            """
            INSERT INTO cierres_mensuales 
            (vendedor_id, mes, anio, total_ventas, cantidad_ventas, fecha_generacion, estado) 
            VALUES (%s, %s, %s, %s, %s, NOW(), 'completo')
            """,
            (vendedor_id, mes, anio, total_ventas, cantidad_ventas)
        )
        conn.commit()

        # Devolver el cierre generado
        cierre_generado = {
            "id": cursor.lastrowid,
            "vendedor_id": vendedor_id,
            "mes": mes,
            "anio": anio,
            "total_ventas": total_ventas,
            "cantidad_ventas": cantidad_ventas,
            "fecha_generacion": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "archivo_excel": None,
            "estado": "completo"
        }
        return jsonify({"status": "ok", "cierre": cierre_generado})
    except mysql.connector.Error as err:
        print("Error generar_cierre:", err)
        if conn:
            conn.rollback()
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()
