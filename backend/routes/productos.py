import os
from flask import Blueprint, jsonify, request
import mysql.connector
from config import Config

productos_bp = Blueprint("productos", __name__)

db_config = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE
}

# ✅ Ruta absoluta a la carpeta uploads (dentro de backend)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(os.path.dirname(BASE_DIR), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 🔹 Desactivar producto (activo = 0)
@productos_bp.route("/desactivar/<int:id>", methods=["PUT"])
def desactivar_producto(id):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE productos
            SET activo = 0
            WHERE id = %s
        """, (id,))
        conn.commit()

        return jsonify({"status": "ok", "message": "Producto desactivado"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        cursor.close()
        conn.close()

@productos_bp.route("/estado/<int:id>", methods=["PUT"])
def actualizar_estado(id):
    try:
        data = request.get_json(force=True)

        if data is None or "activo" not in data:
            return jsonify({"status": "error", "message": "Campo 'activo' requerido"}), 400

        nuevo_estado = data["activo"]  # True o False

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE productos
            SET activo = %s
            WHERE id = %s
        """, (nuevo_estado, id))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"status": "ok", "message": "Estado actualizado"})

    except Exception as ex:
        return jsonify({"status": "error", "message": str(ex)}), 500

# Listar productos
# Listar productos
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

        # Log para verificar los datos
        print("Productos desde backend:", productos)  # Verifica los valores de precio_venta y precio_compra

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

        # Guardar imagen si se sube (solo nombre)
        imagen_filename = None
        if imagen_file:
            imagen_filename = imagen_file.filename  # SOLO nombre, sin ruta
            imagen_file.save(os.path.join(UPLOAD_FOLDER, imagen_filename))

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

        # Guardar imagen si se sube (solo nombre)
        imagen_filename = None
        if imagen_file:
            imagen_filename = imagen_file.filename  # SOLO nombre, sin ruta
            imagen_file.save(os.path.join(UPLOAD_FOLDER, imagen_filename))

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


# 🔹 Eliminar producto REAL
@productos_bp.route("/<int:id>", methods=["DELETE"])
def eliminar_producto(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM productos WHERE id = %s", (id,))
        conn.commit()

        return jsonify({"status": "ok", "message": "Producto eliminado correctamente"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
