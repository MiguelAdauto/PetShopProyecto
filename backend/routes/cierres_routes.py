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

# =====================================================
# 🔹 LISTAR TODOS LOS CIERRES MENSUALES
# =====================================================
@cierres_bp.route("/listar", methods=["GET"])
def listar_cierres():
    conn = cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT c.*, 
                   u.nombre AS vendedor_nombre, 
                   u.apellido AS vendedor_apellido
            FROM cierres_mensuales c
            LEFT JOIN usuarios u ON c.vendedor_id = u.id
            ORDER BY c.anio DESC, c.mes DESC
        """)

        cierres = cursor.fetchall()

        # 🔥 FIX: convertir fecha_generacion
        for c in cierres:
            if isinstance(c["fecha_generacion"], str):
                try:
                    fecha = datetime.strptime(
                        c["fecha_generacion"], 
                        "%a, %d %b %Y %H:%M:%S GMT"
                    )
                    c["fecha_generacion"] = fecha.strftime("%Y-%m-%d %H:%M:%S")
                except:
                    pass

        return jsonify({"status": "ok", "cierres": cierres})

    except mysql.connector.Error as err:
        print("Error listar_cierres:", err)
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        if cursor: cursor.close()
        if conn: conn.close()


# =====================================================
# 🔹 GENERAR CIERRE MENSUAL (VENDEDOR)
# =====================================================
@cierres_bp.route("/generar", methods=["POST"])
def generar_cierre():
    try:
        data = request.get_json(force=True)
        print("JSON recibido:", data)

        mes = int(data.get("mes"))
        anio = int(data.get("anio"))
        vendedor_id = int(data.get("vendedor_id"))

        print("vendedor_id usado:", vendedor_id)
        print("mes usado:", mes)
        print("anio usado:", anio)

    except:
        return jsonify({"status": "error", "message": "Datos inválidos"}), 400

    conn = cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # 1️⃣ Verificar si el vendedor YA cerró ese mes
        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM cierres_mensuales
            WHERE mes=%s AND anio=%s AND vendedor_id=%s
        """, (mes, anio, vendedor_id))

        if cursor.fetchone()["total"] > 0:
            return jsonify({
                "status": "error",
                "message": "Este mes ya fue cerrado por este vendedor"
            }), 400

        # 2️⃣ Calcular total y cantidad de ventas del vendedor
        cursor.execute("""
            SELECT COUNT(*) AS cantidad_ventas,
                   IFNULL(SUM(total), 0) AS total_ventas
            FROM boleta_venta
            WHERE vendedor_id=%s 
            AND MONTH(fecha)=%s 
            AND YEAR(fecha)=%s
        """, (vendedor_id, mes, anio))

        datos = cursor.fetchone()
        cantidad_ventas = datos["cantidad_ventas"]
        total_ventas = float(datos["total_ventas"])

        # 3️⃣ Insertar nueva fila del cierre
        cursor.execute("""
            INSERT INTO cierres_mensuales 
                (vendedor_id, mes, anio, total_ventas, cantidad_ventas, fecha_generacion, estado)
            VALUES (%s, %s, %s, %s, %s, NOW(), 'completo')
        """, (vendedor_id, mes, anio, total_ventas, cantidad_ventas))

        conn.commit()
        cierre_id = cursor.lastrowid

        # 4️⃣ Actualizar boletas existentes con cierre_id
        cursor.execute("""
            UPDATE boleta_venta
            SET cierre_id = %s
            WHERE vendedor_id = %s AND MONTH(fecha) = %s AND YEAR(fecha) = %s
        """, (cierre_id, vendedor_id, mes, anio))
        conn.commit()

        # 5️⃣ Responder al frontend
        cierre_generado = {
            "id": cierre_id,
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
        if conn: conn.rollback()
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        if cursor: cursor.close()
        if conn: conn.close()


# =====================================================
# 🔹 DETALLE DE UN CIERRE (VENTAS DEL MES)
# =====================================================
@cierres_bp.route("/detalle/<int:id>", methods=["GET"])
def detalle_cierre(id):
    conn = cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # 1️⃣ Traer cierre
        cursor.execute("""
            SELECT c.*, u.nombre AS vendedor_nombre, u.apellido AS vendedor_apellido
            FROM cierres_mensuales c
            LEFT JOIN usuarios u ON c.vendedor_id = u.id
            WHERE c.id = %s
        """, (id,))
        cierre = cursor.fetchone()
        if not cierre:
            return jsonify({"status": "error", "message": "Cierre no encontrado"}), 404

        # 2️⃣ Traer boletas del cierre
        cursor.execute("""
            SELECT v.*, u.nombre AS vendedor_nombre, u.apellido AS vendedor_apellido
            FROM boleta_venta v
            LEFT JOIN usuarios u ON v.vendedor_id = u.id
            WHERE v.cierre_id = %s
        """, (id,))
        ventas = cursor.fetchall()

        # 3️⃣ Traer productos de cada boleta
        for v in ventas:
            cursor.execute("""
                SELECT p.nombre, dp.cantidad, dp.precio_unitario AS precio, dp.subtotal
                FROM boleta_venta_detalle dp
                LEFT JOIN productos p ON dp.producto_id = p.id
                WHERE dp.boleta_id = %s
            """, (v["id"],))
            productos = cursor.fetchall()
            
            # Agregar metodo de pago desde la boleta a cada producto
            for prod in productos:
                prod["metodo_pago"] = v["tipo_pago"]
            
            v["productos"] = productos

        cierre["ventas"] = ventas

        return jsonify({"status": "ok", "cierre": cierre})

    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()
