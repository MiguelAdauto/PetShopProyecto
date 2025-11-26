from flask import Blueprint, render_template, make_response
from utils.pdf_utils import preparar_datos_boleta
from utils.qr_generator import generar_qr
from utils.numeros_letras import numero_a_letras
from config import Config
import mysql.connector
import pdfkit

pdf_bp = Blueprint("pdf_bp", __name__)

def get_db():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DATABASE
    )

@pdf_bp.route("/boleta/<int:id_venta>")
def ver_boleta(id_venta):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Traer venta con nombre del vendedor
    cursor.execute("""
        SELECT b.id, b.nro_venta, b.tipo_pago, b.cliente_nombre, 
               b.vendedor_id, u.nombre AS vendedor_nombre, u.apellido AS vendedor_apellido,
               b.total, b.pagado, b.cambio, b.serie_id, b.nro_correlativo, b.fecha
        FROM boleta_venta b
        LEFT JOIN usuarios u ON u.id = b.vendedor_id
        WHERE b.id = %s
    """, (id_venta,))
    venta = cursor.fetchone()

    if not venta:
        return "Boleta no encontrada", 404

    # Traer detalle de la venta
    cursor.execute("""
        SELECT d.cantidad, d.precio_unitario AS precio, d.subtotal,
               p.nombre
        FROM boleta_venta_detalle d
        LEFT JOIN productos p ON p.id = d.producto_id
        WHERE d.boleta_id = %s
    """, (id_venta,))
    items = cursor.fetchall()

    datos = preparar_datos_boleta(venta, items)

    cursor.close()
    db.close()

    return render_template("boleta.html", **datos)


@pdf_bp.route("/boleta/pdf/<int:id_venta>")
def descargar_boleta(id_venta):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Obtener datos de la venta
    cursor.execute("""
        SELECT b.id, b.nro_venta, b.tipo_pago, b.cliente_nombre, 
               b.vendedor_id, u.nombre AS vendedor_nombre, u.apellido AS vendedor_apellido,
               b.total, b.pagado, b.cambio, b.serie_id, b.nro_correlativo, b.fecha
        FROM boleta_venta b
        LEFT JOIN usuarios u ON u.id = b.vendedor_id
        WHERE b.id = %s
    """, (id_venta,))
    venta = cursor.fetchone()

    if not venta:
        return "Boleta no encontrada", 404

    # Obtener detalle de la venta
    cursor.execute("""
        SELECT d.cantidad, d.precio_unitario AS precio, d.subtotal,
               p.nombre
        FROM boleta_venta_detalle d
        LEFT JOIN productos p ON p.id = d.producto_id
        WHERE d.boleta_id = %s
    """, (id_venta,))
    items = cursor.fetchall()

    cursor.close()
    db.close()

    # Preparar datos para la plantilla
    datos = preparar_datos_boleta(venta, items)

    # Imprimir ruta del logo para debug
    print("Logo URL:", datos['logo_url'])

    # Renderizar HTML
    rendered = render_template("boleta.html", **datos)

    # Configuración de wkhtmltopdf
    config = pdfkit.configuration(wkhtmltopdf=r"C:\wkhtmltopdf\bin\wkhtmltopdf.exe")

    options = {
        'page-width': '80mm',          # ancho de ticket
        'page-height': '400mm',        # suficiente para todo el contenido
        'margin-top': '5mm',
        'margin-bottom': '5mm',
        'margin-left': '5mm',
        'margin-right': '5mm',
        'enable-local-file-access': '' # permite usar file:///
    }

    # Generar PDF
    pdf = pdfkit.from_string(rendered, False, options=options, configuration=config)

    # Devolver como archivo descargable
    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = f'attachment; filename=boleta_{id_venta}.pdf'
    return response
