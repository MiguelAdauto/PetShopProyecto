from flask import Blueprint, request, jsonify
import mysql.connector
from config import Config
from datetime import datetime

ventas_bp = Blueprint("ventas", __name__, url_prefix="/ventas")

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

# ==============================
# GET serie actual + correlativo
# ==============================
@ventas_bp.route("/serie", methods=["GET"])
def obtener_serie():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT serie, correlativo_actual FROM series WHERE activo = 1 LIMIT 1")
        serie = cursor.fetchone()

        if serie:
            return jsonify({
                "status": "ok",
                "serie": serie["serie"],
                "correlativo": serie["correlativo_actual"]
            })

        return jsonify({"status": "error", "message": "No hay serie activa"}), 404

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()

# ==============================
# PUT actualizar SERIE (FALTABA)
# ==============================
@ventas_bp.route("/serie", methods=["PUT"])
def actualizar_serie():
    data = request.json
    nueva_serie = data.get("serie")

    if not nueva_serie:
        return jsonify({"status": "error", "message": "Debe enviar una serie válida"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE series
            SET serie = %s
            WHERE activo = 1
        """, (nueva_serie,))

        conn.commit()

        return jsonify({"status": "ok", "message": "Serie actualizada", "serie": nueva_serie})

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()


# ==============================
# PUT actualizar CORRELATIVO
# ==============================
@ventas_bp.route("/correlativo", methods=["PUT"])
def actualizar_correlativo():
    data = request.json
    nuevo_correlativo = data.get("correlativo")

    if nuevo_correlativo is None:
        return jsonify({"status": "error", "message": "Debe proporcionar un correlativo válido"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE series
            SET correlativo_actual = %s
            WHERE activo = 1
        """, (nuevo_correlativo,))

        conn.commit()

        return jsonify({
            "status": "ok",
            "message": "Correlativo actualizado",
            "correlativo": nuevo_correlativo
        })

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()


# ==============================
# POST registrar venta con serie
# ==============================
@ventas_bp.route("/", methods=["POST"])
def registrar_venta():
    data = request.json

    cliente = data.get("cliente_nombre", "Consumidor Final")
    total = data.get("total")
    pago_cliente = data.get("pagado")
    vuelto = data.get("cambio")
    metodo_pago = data.get("metodo_pago")
    vendedor_id = data.get("vendedor_id", 1)
    productos = data.get("productos", [])

    if not productos:
        return jsonify({"status": "error", "message": "No hay productos en la venta"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Validar stock
        for prod in productos:
            cursor.execute("SELECT stock FROM productos WHERE id = %s", (prod["id_producto"],))
            resultado = cursor.fetchone()
            if not resultado:
                return jsonify({"status": "error", "message": f"Producto {prod['id_producto']} no encontrado"}), 404

            stock_actual = resultado[0]
            if stock_actual < prod["cantidad"]:
                return jsonify({"status": "error", "message": f"No hay suficiente stock para el producto {prod['id_producto']}"}), 400

        # Obtener serie y correlativo
        cursor.execute("SELECT id, serie, correlativo_actual FROM series WHERE activo = 1 LIMIT 1")
        serie_data = cursor.fetchone()

        if not serie_data:
            return jsonify({"status": "error", "message": "No hay serie activa"}), 500

        serie_id, serie_str, correlativo_actual = serie_data

        # Incrementar correlativo
        correlativo_actual += 1

        # 🔥 Generar número de boleta correctamente
        nro_venta = f"{serie_str}{str(correlativo_actual).zfill(6)}"

        # Insertar venta
        cursor.execute("""
            INSERT INTO boleta_venta (
                fecha, serie_id, nro_correlativo, nro_venta,
                tipo_pago, cliente_nombre, vendedor_id,
                total, pagado, cambio
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            datetime.now(), serie_id, correlativo_actual, nro_venta,
            metodo_pago, cliente, vendedor_id, total, pago_cliente, vuelto
        ))

        venta_id = cursor.lastrowid

        # Insertar detalles
        for prod in productos:
            cursor.execute("""
                INSERT INTO boleta_venta_detalle 
                (boleta_id, producto_id, cantidad, precio_unitario, subtotal)
                VALUES (%s, %s, %s, %s, %s)
            """, (
                venta_id, prod["id_producto"], prod["cantidad"],
                prod["precio_unitario"], prod["cantidad"] * prod["precio_unitario"]
            ))

            cursor.execute("UPDATE productos SET stock = stock - %s WHERE id = %s",
                           (prod["cantidad"], prod["id_producto"]))

        # Actualizar correlativo
        cursor.execute("UPDATE series SET correlativo_actual = %s WHERE id = %s",
                       (correlativo_actual, serie_id))

        conn.commit()

        return jsonify({
            "status": "ok",
            "message": "Venta registrada",
            "boleta": nro_venta
        })

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()


# ============================
# GET - Listar ventas
# ============================
@ventas_bp.route("/listar", methods=["GET"])
def listar_ventas():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                v.id,
                v.nro_venta AS nro,
                v.tipo_pago AS tipoPago,
                v.fecha,
                v.cliente_nombre AS cliente,
                v.total
            FROM boleta_venta v
            ORDER BY v.id DESC
        """)

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
        
@ventas_bp.route("/detalle/<int:boleta_id>", methods=["GET"])
def obtener_detalle_venta(boleta_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # =========================
        # 1️⃣ OBTENER DATOS GENERALES
        # =========================
        cursor.execute("""
            SELECT 
                b.id,
                b.fecha,
                b.nro_venta,
                b.tipo_pago,
                b.cliente_nombre,
                b.total,
                b.pagado,
                b.cambio,
                u.nombre AS vendedor
            FROM boleta_venta b
            LEFT JOIN usuarios u ON b.vendedor_id = u.id
            WHERE b.id = %s
        """, (boleta_id,))

        venta = cursor.fetchone()

        if not venta:
            return jsonify({"status": "error", "message": "Venta no encontrada"}), 404

        # ===============================
        # 2️⃣ OBTENER DETALLES DE PRODUCTOS
        # ===============================
        cursor.execute("""
            SELECT 
                d.cantidad,
                d.precio_unitario,
                d.subtotal,
                p.nombre AS producto
            FROM boleta_venta_detalle d
            INNER JOIN productos p ON d.producto_id = p.id
            WHERE d.boleta_id = %s
        """, (boleta_id,))

        detalles = cursor.fetchall()

        # Agregar detalles a la venta
        venta["detalles"] = detalles

        return jsonify({"status": "ok", "venta": venta})

    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()