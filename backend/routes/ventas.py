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
        else:
            return jsonify({"status": "error", "message": "No hay serie activa"}), 404
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        cursor.close()
        conn.close()


# ==============================
# PUT actualizar serie
# ==============================
@ventas_bp.route("/serie", methods=["PUT"])
def actualizar_serie():
    data = request.json
    nueva_serie = data.get("serie")

    if not nueva_serie:
        return jsonify({"status": "error", "message": "Debe proporcionar la serie"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Mantener el correlativo actual
        cursor.execute("SELECT correlativo_actual FROM series WHERE activo = 1 LIMIT 1")
        result = cursor.fetchone()
        correlativo_actual = result[0] if result else 0

        cursor.execute("""
            UPDATE series
            SET serie = %s, correlativo_actual = %s
            WHERE activo = 1
        """, (nueva_serie, correlativo_actual))

        conn.commit()
        return jsonify({
            "status": "ok",
            "message": "Serie actualizada",
            "serie": nueva_serie,
            "correlativo": correlativo_actual
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

        # 1️⃣ Validar stock
        for prod in productos:
            cursor.execute("SELECT stock FROM productos WHERE id = %s", (prod["id_producto"],))
            resultado = cursor.fetchone()
            if not resultado:
                return jsonify({"status": "error", "message": f"Producto {prod['id_producto']} no encontrado"}), 404
            stock_actual = resultado[0]
            if stock_actual < prod["cantidad"]:
                return jsonify({"status": "error", "message": f"No hay suficiente stock para el producto {prod['id_producto']}"}), 400

        # 2️⃣ Obtener serie y correlativo actual
        cursor.execute("SELECT id, serie, correlativo_actual FROM series WHERE activo = 1 LIMIT 1")
        serie_data = cursor.fetchone()
        if not serie_data:
            return jsonify({"status": "error", "message": "No hay serie activa"}), 500
        serie_id, serie_str, correlativo_actual = serie_data

        # Incrementar correlativo para esta venta
        correlativo_actual += 1
        nro_venta = f"B{str(correlativo_actual).zfill(6)}"  # Ej: B000036, B000037, ...

        # 3️⃣ Insertar venta
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

        # 4️⃣ Insertar detalles y actualizar stock
        for prod in productos:
            cursor.execute("""
                INSERT INTO boleta_venta_detalle (boleta_id, producto_id, cantidad, precio_unitario, subtotal)
                VALUES (%s, %s, %s, %s, %s)
            """, (venta_id, prod["id_producto"], prod["cantidad"], prod["precio_unitario"], prod["cantidad"]*prod["precio_unitario"]))

            cursor.execute("UPDATE productos SET stock = stock - %s WHERE id = %s", (prod["cantidad"], prod["id_producto"]))

        # 5️⃣ Actualizar correlativo en la serie
        cursor.execute("UPDATE series SET correlativo_actual = %s WHERE id = %s", (correlativo_actual, serie_id))

        conn.commit()
        return jsonify({"status": "ok", "message": "Venta registrada", "boleta": nro_venta})

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        cursor.close()
        conn.close()
