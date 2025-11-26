from utils.qr_generator import generar_qr
from utils.numeros_letras import numero_a_letras
import os

def preparar_datos_boleta(venta, items):
    """
    Prepara los datos para renderizar la boleta
    """
    subtotal = sum(item["subtotal"] for item in items)

    # Ruta absoluta del logo para wkhtmltopdf
    base_dir = os.path.dirname(os.path.abspath(__file__))  # carpeta donde está pdf_utils.py
    logo_path = os.path.join(base_dir, "..", "static", "Logito.jpg")  # sube un nivel para ir a backend/static
    logo_path = os.path.abspath(logo_path)

    assert os.path.exists(logo_path), f"El logo no se encuentra en {logo_path}"

    logo_url = f"file:///{logo_path.replace(os.sep, '/')}"

    return {
        # Usamos el número de boleta tal como está en la base de datos
        "serie": venta.get("nro_venta") or f"{venta['serie_id']}-{venta['nro_correlativo']}",
        "fecha": venta["fecha"].strftime("%d/%m/%Y"),
        "cliente": venta.get("cliente_nombre") or "Cliente Genérico",
        "cajero": f"{venta.get('vendedor_nombre','')} {venta.get('vendedor_apellido','')}".strip() or "Vendedor",
        "subtotal": subtotal,
        "descuento": 0,
        "total": venta.get("total") or subtotal,
        "efectivo": venta.get("pagado") or 0,
        "vuelto": venta.get("cambio") or 0,
        "tipo_pago": venta.get("tipo_pago") or "Efectivo",
        "items": items,
        "qr_base64": generar_qr(f"Venta #{venta['id']}"),
        "logo_url": logo_url,
        "total_letras": numero_a_letras(venta.get("total") or subtotal)
    }
