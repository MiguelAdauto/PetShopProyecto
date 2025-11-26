import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import "./DetalleVenta.css";

const DetalleVenta = () => {
  const { id } = useParams();
  const [venta, setVenta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const res = await api.get(`/ventas/detalle/${id}`);

        if (res.data.status === "ok") {
          const v = res.data.venta;

          // Convertir montos a número (evita error .toFixed)
          v.total = Number(v.total || 0);
          v.pagado = Number(v.pagado || 0);
          v.cambio = Number(v.cambio || 0);

          // Convertir detalle
          v.detalles = v.detalles.map((d: any) => ({
            ...d,
            cantidad: Number(d.cantidad),
            precio_unitario: Number(d.precio_unitario),
            subtotal: Number(d.subtotal),
          }));

          setVenta(v);
        }
      } catch (error) {
        console.error("Error cargando detalle:", error);
      }

      setLoading(false);
    };

    cargarDetalle();
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!venta) return <p>No se encontró la venta</p>;

  return (
    <div className="detalle-venta-container">
      <h2>Venta: ({venta.nro_venta})</h2>

      <div className="info-venta-grid">
        <div className="columna">
          <div><strong>Fecha:</strong> <span className="valor">{venta.fecha}</span></div>
          <div><strong>N° Venta:</strong> <span className="valor">{venta.nro_venta}</span></div>
          <div><strong>Tipo de Pago:</strong> <span className="valor">{venta.tipo_pago}</span></div>
        </div>

        <div className="columna centro">
          <div><strong>Cliente:</strong> <span className="valor">{venta.cliente_nombre}</span></div>
          <div><strong>Vendedor:</strong> <span className="valor">{venta.vendedor}</span></div>
        </div>

        <div className="columna derecha">
          <div><strong>Total:</strong> <span className="valor total">S/{venta.total.toFixed(2)}</span></div>
          <div><strong>Pagado:</strong> <span className="valor pagado">S/{venta.pagado.toFixed(2)}</span></div>
          <div><strong>Cambio:</strong> <span className="valor cambio">S/{venta.cambio.toFixed(2)}</span></div>
        </div>
      </div>

      <table className="tabla-detalle">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {venta.detalles.map((d: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{d.producto}</td>
              <td>{d.cantidad}</td>
              <td>S/{d.precio_unitario.toFixed(2)}</td>
              <td>S/{d.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={4}><strong>TOTAL</strong></td>
            <td><strong>S/{venta.total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <div className="boton-descargar">
        <button onClick={() => window.open(`http://127.0.0.1:5000/pdf/boleta/pdf/${id}`, "_blank")}>
  Descargar Boleta
</button>

      </div>
    </div>
  );
};

export default DetalleVenta;
