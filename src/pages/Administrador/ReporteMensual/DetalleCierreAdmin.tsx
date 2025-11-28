// src/pages/Administrador/ReporteMensual/DetalleCierreAdmin.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js"; // importamos

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
  const reporteRef = useRef<HTMLDivElement>(null);

  // 🔹 Cargar datos del backend
  useEffect(() => {
    const fetchCierre = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/cierres/detalle/${id}`);
        const data = await res.json();

        if (data.status === "ok") {
          const c = data.cierre;
          setCierre({
            id: c.id,
            mes: c.mes,
            anio: c.anio,
            vendedor: `${c.vendedor_nombre} ${c.vendedor_apellido}`,
            ventas: c.ventas.map((v: any) => ({
              id: v.id,
              fecha: v.fecha,
              numeroBoleta: v.nro_venta,
              vendedor: `${v.vendedor_nombre} ${v.vendedor_apellido}`,
              subtotal: Number(v.total),
              productos: v.productos.map((p: any) => ({
                nombre: p.nombre,
                cantidad: Number(p.cantidad),
                precio: Number(p.precio),
                metodoPago: p.metodo_pago,
              })),
            })),
          });
        }
      } catch (error) {
        console.error("Error al cargar cierre:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCierre();
  }, [id]);

  // 🔹 Descargar PDF (usa un clon para imprimir todo)
  const descargarPDF = () => {
    if (!reporteRef.current) return;
    setDescargando(true);

    const clone = reporteRef.current.cloneNode(true) as HTMLElement;
    clone.style.maxHeight = "none";
    clone.style.overflow = "visible";

    const opt = {
      margin: 0.5,
      filename: `reporte_cierre_${cierre?.id}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const },
    };

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.appendChild(clone);
    document.body.appendChild(container);

    html2pdf().set(opt).from(clone).save().finally(() => {
      setDescargando(false);
      document.body.removeChild(container);
    });
  };

  if (loading) return <p>Cargando cierre...</p>;
  if (!cierre) return <p>No se encontró el cierre.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Detalle del Cierre — {cierre.vendedor} ({cierre.mes} / {cierre.anio})
      </h2>

      <button
        onClick={descargarPDF}
        disabled={descargando}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          cursor: descargando ? "not-allowed" : "pointer",
          backgroundColor: "#4143be",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        {descargando ? "Generando PDF..." : "Descargar reporte PDF"}
      </button>

      {cierre.ventas.length === 0 && <p>No hubo ventas este mes.</p>}

      {/* Contenedor con scroll en pantalla */}
      <div
        ref={reporteRef}
        style={{
          maxHeight: "680px",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      >
        {cierre.ventas.map((venta, index) => (
          <div
            key={venta.id}
            style={{
              marginBottom: "30px",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>Venta {index + 1} — Boleta: {venta.numeroBoleta}</h3>
            <p>
              Vendedor: {venta.vendedor} | Fecha: {venta.fecha}
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: "5px" }}>
                    Producto
                  </th>
                  <th style={{ border: "1px solid #ccc", padding: "5px" }}>
                    Cantidad
                  </th>
                  <th style={{ border: "1px solid #ccc", padding: "5px" }}>
                    Precio
                  </th>
                  <th style={{ border: "1px solid #ccc", padding: "5px" }}>
                    Tipo de pago
                  </th>
                </tr>
              </thead>
              <tbody>
                {venta.productos.map((prod, i) => (
                  <tr key={i}>
                    <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                      {prod.nombre}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                      {prod.cantidad}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                      S/{prod.precio.toFixed(2)}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                      {prod.metodoPago}
                    </td>
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
    </div>
  );
};

export default DetalleCierreAdmin;
