from flask import Blueprint, jsonify, request
import mysql.connector
from config import Config
import os

productos_bp = Blueprint("productos", __name__)

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # crea carpeta uploads si no existe

# 🔹 Listar productos
@productos_bp.route("/", methods=["GET"])
def listar_productos():
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT p.id, p.nombre, p.codigo, p.imagen,
                   p.precio_venta, p.precio_compra, p.stock, p.activo,
                   c.nombre AS categoria, s.nombre AS subcategoria
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            LEFT JOIN subcategorias s ON p.subcategoria_id = s.id
        """)
        productos = cursor.fetchall()
        return jsonify({"status": "ok", "productos": productos})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# 🔹 Agregar un nuevo producto
@productos_bp.route("/", methods=["POST"])
def agregar_producto():
    data = request.form
    imagen_file = request.files.get("imagen")

    required_fields = ["nombre", "codigo", "precio_venta", "categoria_id", "subcategoria_id"]
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({"status": "error", "message": "Faltan campos obligatorios"}), 400

    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Guardar imagen si se sube
        imagen_filename = None
        if imagen_file:
            imagen_filename = os.path.join(UPLOAD_FOLDER, imagen_file.filename)
            imagen_file.save(imagen_filename)

        # Convertir tipos
        precio_venta = float(data.get("precio_venta"))
        precio_compra = float(data.get("precio_compra", 0))
        stock = int(data.get("stock", 0))
        categoria_id = int(data.get("categoria_id"))
        subcategoria_id = int(data.get("subcategoria_id"))

        cursor.execute("""
            INSERT INTO productos 
            (nombre, imagen, codigo, precio_venta, precio_compra, 
             categoria_id, subcategoria_id, stock, activo)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            data.get("nombre"),
            imagen_filename,
            data.get("codigo"),
            precio_venta,
            precio_compra,
            categoria_id,
            subcategoria_id,
            stock,
            True
        ))

        conn.commit()
        return jsonify({"status": "ok", "message": "Producto agregado correctamente"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# 🔹 Actualizar un producto
@productos_bp.route("/<int:id>", methods=["PUT"])
def actualizar_producto(id):
    data = request.form
    imagen_file = request.files.get("imagen")

    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Guardar imagen si se sube
        imagen_filename = None
        if imagen_file:
            imagen_filename = os.path.join(UPLOAD_FOLDER, imagen_file.filename)
            imagen_file.save(imagen_filename)

        # Convertir tipos
        precio_venta = float(data.get("precio_venta", 0))
        precio_compra = float(data.get("precio_compra", 0))
        stock = int(data.get("stock", 0))
        categoria_id = int(data.get("categoria_id", 0))
        subcategoria_id = int(data.get("subcategoria_id", 0))
        activo = bool(int(data.get("activo", 1)))  # 1 o 0

        cursor.execute("""
            UPDATE productos 
            SET nombre=%s,
                codigo=%s,
                precio_venta=%s,
                precio_compra=%s,
                stock=%s,
                categoria_id=%s,
                subcategoria_id=%s,
                activo=%s,
                imagen=COALESCE(%s, imagen)
            WHERE id=%s
        """, (
            data.get("nombre"),
            data.get("codigo"),
            precio_venta,
            precio_compra,
            stock,
            categoria_id,
            subcategoria_id,
            activo,
            imagen_filename,
            id
        ))

        conn.commit()
        return jsonify({"status": "ok", "message": "Producto actualizado"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# 🔹 Eliminar (o desactivar) producto
@productos_bp.route("/<int:id>", methods=["DELETE"])
def eliminar_producto(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("UPDATE productos SET activo = 0 WHERE id = %s", (id,))
        conn.commit()
        return jsonify({"status": "ok", "message": "Producto eliminado (inactivo)"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
