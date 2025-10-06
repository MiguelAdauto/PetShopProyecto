// src/pages/Vendedor/VentasListado/DetalleVenta.tsx
import './DetalleVenta.css';

const DetalleVenta = () => {
  return (
    <div className="detalle-venta-container">
      <h2>Datos de la Venta: (B001)</h2>

      <div className="info-venta">
  {/* Fila 1 */}
  <div className="fila">
    <div><strong>Fecha:</strong> <span className="valor">17-09-2025 11:35am</span></div>
    <div><strong>Cliente:</strong> <span className="valor">Pepito</span></div>
    <div><strong>Total:</strong> <span className="valor total">s/22.00</span></div>
  </div>

  {/* Fila 2 */}
  <div className="fila">
    <div><strong>Nro de Venta:</strong> <span className="valor">001</span></div>
    <div><strong>Vendedor:</strong> <span className="valor">Vendedor</span></div>
    <div><strong>Pagado:</strong> <span className="valor pagado">s/50.00</span></div>
  </div>

  {/* Fila 3 con separación entre izquierda y derecha */}
  <div className="fila-dos">
    <div><strong>Tipo de Pago:</strong> <span className="valor">Yape</span></div>
    <div><strong>Cambio:</strong> <span className="valor cambio">s/28.00</span></div>
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
          <tr>
            <td>1</td>
            <td>Collar Perro</td>
            <td>1</td>
            <td>22.00</td>
            <td>22.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}><strong>TOTAL</strong></td>
            <td><strong>22.00</strong></td>
          </tr>
        </tfoot>
      </table>

      <div className="boton-descargar">
        <button>📄 Descargar Boleta</button>
      </div>
    </div>
  );
};

export default DetalleVenta;
