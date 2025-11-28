from flask import Blueprint, request, jsonify
import mysql.connector
from config import Config
from datetime import datetime, timedelta

dashboard_bp = Blueprint("dashboard", __name__)

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

# ---------------------------
# 🔹 Total de Ventas del Día (corregido)
# ---------------------------
@dashboard_bp.route("/ventas/total-dia", methods=["GET"])
def total_ventas_dia():
    fecha = request.args.get("fecha")  # yyyy-mm-dd
    if not fecha:
        return jsonify({"status": "error", "message": "Debe enviar fecha"}), 400

    conn, cursor = None, None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Asegurarse de usar la tabla correcta y comparar solo la fecha
        cursor.execute(
            "SELECT SUM(total) as total FROM boleta_venta WHERE DATE(fecha) = %s",
            (fecha,)
        )
        result = cursor.fetchone()
        total = float(result["total"]) if result and result["total"] else 0.0

        return jsonify({"status": "ok", "total": total})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# ---------------------------
# 🔹 Productos Vendidos Hoy
# ---------------------------
@dashboard_bp.route("/ventas/productos-dia", methods=["GET"])
def productos_vendidos_dia():
    fecha = request.args.get("fecha")  # yyyy-mm-dd
    if not fecha:
        return jsonify({"status": "error", "message": "Debe enviar fecha"}), 400

    conn, cursor = None, None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT COUNT(*) as total_productos FROM boleta_venta_detalle d "
            "JOIN boleta_venta v ON d.boleta_id = v.id "
            "WHERE DATE(v.fecha) = %s",
            (fecha,)
        )
        result = cursor.fetchone()
        total_productos = result["total_productos"] if result else 0
        return jsonify({"status": "ok", "total": total_productos})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# 🔹 Top 5 Subcategorías Vendidas (general, sin fechas)
@dashboard_bp.route("/ventas/top-subcategorias", methods=["GET"])
def top_subcategorias():
    conn, cursor = None, None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT s.nombre AS subcategoria, SUM(d.cantidad) AS total
            FROM boleta_venta_detalle d
            JOIN boleta_venta b ON d.boleta_id = b.id
            JOIN productos p ON d.producto_id = p.id
            JOIN subcategorias s ON p.subcategoria_id = s.id
            GROUP BY s.id
            ORDER BY total DESC
            LIMIT 5
            """
        )

        results = cursor.fetchall()
        labels = [r["subcategoria"] for r in results]
        series = [r["total"] for r in results]

        return jsonify({"status": "ok", "labels": labels, "series": series})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()
# ---------------------------
# 🔹 Ventas para LineChart por Mes
# ---------------------------
@dashboard_bp.route("/ventas/line-mensual", methods=["GET"])
def ventas_line_mes():
    anio = request.args.get("anio")  # yyyy
    if not anio:
        return jsonify({"status": "error", "message": "Debe enviar año"}), 400

    conn, cursor = None, None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT MONTH(fecha) AS mes, SUM(total) AS total
            FROM ventas
            WHERE YEAR(fecha) = %s
            GROUP BY MONTH(fecha)
            ORDER BY mes ASC
            """,
            (anio,)
        )
        results = cursor.fetchall()
        labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]
        series = [0]*12
        for r in results:
            series[r["mes"]-1] = float(r["total"])
        return jsonify({"status": "ok", "labels": labels, "series": series})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()


# 🔹 Últimas ventas para dashboard con Producto, Subcategoría y Vendedor
@dashboard_bp.route("/ventas/listar-detalle-dashboard", methods=["GET"])
def listar_ventas_detalle_dashboard():
    limit = request.args.get("limit", default=5, type=int)
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                v.fecha,
                p.nombre AS producto,
                sc.nombre AS subcategoria,
                u.nombre AS vendedor,
                v.total
            FROM boleta_venta_detalle d
            JOIN boleta_venta v ON d.boleta_id = v.id
            JOIN productos p ON d.producto_id = p.id
            LEFT JOIN subcategorias sc ON p.subcategoria_id = sc.id
            LEFT JOIN usuarios u ON v.vendedor_id = u.id
            ORDER BY v.id DESC
            LIMIT %s
        """, (limit,))

        ventas = cursor.fetchall()

        # Formatear fecha
        for v in ventas:
            if isinstance(v["fecha"], datetime):
                v["fecha"] = v["fecha"].strftime("%Y-%m-%d %H:%M:%S")

        return jsonify({"status": "ok", "ventas": ventas})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()