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

@ventas_bp.route("/", methods=["POST"])
def registrar_venta():
    data = request.json

    cliente = data.get("cliente", "Consumidor Final")
    total = data.get("total")
    pago_cliente = data.get("pagoCliente")
    vuelto = data.get("vuelto")
    metodo_pago = data.get("metodoPago")  # "Efectivo", "Yape", "Plin", "Mixto"
    productos = data.get("productos", [])

    if not productos:
        return jsonify({"status": "error", "message": "No hay productos en la venta"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # 1️⃣ Insertar venta
        cursor.execute("""
            INSERT INTO ventas (cliente, total, pago_cliente, vuelto, metodo_pago, fecha)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (cliente, total, pago_cliente, vuelto, metodo_pago, datetime.now()))

        venta_id = cursor.lastrowid

        # 2️⃣ Insertar detalles + actualizar stock
        for prod in productos:
            producto_id = prod["id"]
            cantidad = prod["cantidad"]
            precio = prod["precio"]

            cursor.execute("""
                INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario)
                VALUES (%s, %s, %s, %s)
            """, (venta_id, producto_id, cantidad, precio))

            # Restar stock
            cursor.execute("""
                UPDATE productos SET stock = stock - %s WHERE id = %s
            """, (cantidad, producto_id))

        conn.commit()

        return jsonify({
            "status": "ok",
            "message": "Venta registrada correctamente",
            "venta_id": venta_id
        })

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({"status": "error", "message": str(err)}), 500

    finally:
        cursor.close()
        conn.close()
