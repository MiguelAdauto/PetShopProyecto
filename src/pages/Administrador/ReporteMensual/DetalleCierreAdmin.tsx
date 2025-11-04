// src/pages/Administrador/ReporteMensual/DetalleCierreAdmin.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Interfaces simuladas
interface Producto {
  nombre: string;
  cantidad: number;
  precio: number;
  metodoPago: string;
}

interface Venta {
  id: number;
  fecha: string;
  numeroBoleta: string;
  vendedor: string;
  productos: Producto[];
  subtotal: number;
}

interface Cierre {
  id: number;
  mes: string;
  anio: string;
  vendedor: string;
  ventas: Venta[];
}

const DetalleCierreAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const [cierre, setCierre] = useState<Cierre | null>(null);
  const [loading, setLoading] = useState(true);
  const [descargando, setDescargando] = useState(false);

  useEffect(() => {
    const fetchCierre = async () => {
      setLoading(true);
      try {
        // Simulación de datos
        const data: Cierre = {
          id: Number(id) || 0,
          mes: "Octubre",
          anio: "2025",
          vendedor: "Juan Pérez",
          ventas: [
            {
              id: 1,
              fecha: "2025-11-04",
              numeroBoleta: "B001",
              vendedor: "Juan Pérez",
              subtotal: 150,
              productos: [
                { nombre: "Producto A", cantidad: 2, precio: 50, metodoPago: "Efectivo" },
                { nombre: "Producto B", cantidad: 1, precio: 50, metodoPago: "Tarjeta" },
              ],
            },
            // Puedes agregar más ventas simuladas aquí si quieres
          ],
        };

        setCierre(data);
      } catch (error) {
        console.error("Error al cargar cierre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCierre();
  }, [id]);

  // Función para descargar el PDF (simulación, luego adaptas al backend)
  const descargarReporte = async () => {
    setDescargando(true);
    try {
      // Aquí va la llamada real a la API que genera y devuelve el PDF
      // Por ejemplo:
      // const response = await fetch(`/api/cierres/${id}/reporte-pdf`);
      // const blob = await response.blob();

      // Simulación: creamos un blob vacío para que no rompa la demo
      const blob = new Blob(["Reporte PDF simulado"], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reporte_cierre_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar reporte PDF:", error);
      alert("Error al descargar el reporte. Intente nuevamente.");
    } finally {
      setDescargando(false);
    }
  };

  if (loading) return <p>Cargando cierre...</p>;
  if (!cierre) return <p>No se encontró el cierre.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Detalle del Cierre - {cierre.vendedor} ({cierre.mes} {cierre.anio})
      </h2>

      <button
        onClick={descargarReporte}
        disabled={descargando}
        style={{ marginBottom: "20px", padding: "10px 15px", cursor: descargando ? "not-allowed" : "pointer" }}
      >
        {descargando ? "Descargando..." : "Descargar detalles de ventas (PDF)"}
      </button>

      {cierre.ventas.map((venta, index) => (
        <div
          key={venta.id}
          style={{
            marginBottom: "30px",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px"
          }}
        >
          <h3>Venta {index + 1} - Boleta: {venta.numeroBoleta}</h3>
          <p>Vendedor: {venta.vendedor} | Fecha: {venta.fecha}</p>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Producto</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Cantidad</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Precio</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Tipo de pago</th>
              </tr>
            </thead>
            <tbody>
              {venta.productos.map((prod, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{prod.nombre}</td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{prod.cantidad}</td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>S/{prod.precio.toFixed(2)}</td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{prod.metodoPago}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ textAlign: "right", fontWeight: "bold" }}>
            Subtotal: S/{venta.subtotal.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DetalleCierreAdmin;