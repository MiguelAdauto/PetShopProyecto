import trashIcon from '../../assets/trash.svg';
import './ResumenDeOrden.css';
import React, { useState } from 'react';
import api from "../../api/api";

type ProductoCarrito = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
};

type Props = {
  carrito: ProductoCarrito[];
  setCarrito: React.Dispatch<React.SetStateAction<ProductoCarrito[]>>;
};

const ResumenDeOrden = ({ carrito, setCarrito }: Props) => {
  const [cliente, setCliente] = useState('');
  const [pagoCliente, setPagoCliente] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const totalPagar = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );

  const vuelto =
    pagoCliente !== '' ? Math.max(pagoCliente - totalPagar, 0) : 0;

  const aumentarCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
      )
    );
  };

  const disminuirCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((prod) =>
        prod.id === id && prod.cantidad > 1
          ? { ...prod, cantidad: prod.cantidad - 1 }
          : prod
      )
    );
  };

  const eliminarProducto = (id: number) => {
    setCarrito((prev) => prev.filter((prod) => prod.id !== id));
  };

  // =============================================
  // 🔥 FUNCIÓN PARA REGISTRAR LA VENTA
  // =============================================
  const registrarVenta = async (metodoPago: string) => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (pagoCliente === '' || pagoCliente < totalPagar) {
      alert("El pago del cliente es insuficiente.");
      return;
    }

    const ventaData = {
      metodo_pago: metodoPago,
      cliente_nombre: cliente || "Consumidor Final",
      vendedor_id: 1, // tu id real
      total: totalPagar,
      pagado: pagoCliente,
      cambio: vuelto,
      productos: carrito.map((p) => ({
        id_producto: p.id,
        cantidad: p.cantidad,
        precio_unitario: p.precio
      }))
    };

    try {
      setLoading(true);
      const res = await api.post("/ventas/", ventaData);

      if (res.data.status === "ok") {
        alert(`Venta registrada ✔\nBoleta: ${res.data.boleta}`);
        setCarrito([]);
        setCliente("");
        setPagoCliente("");
      } else {
        alert("Error al registrar la venta");
      }
    } catch (error) {
      console.error("Error al registrar venta:", error);
      alert("Error con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resumen-orden">
      <h2 className="titulo-resumen">
        RESUMEN DE LA ORDEN <i className="bi bi-cart-fill"></i>
      </h2>
      <hr />

      <div className="lista-productos">
        {carrito.length === 0 && <p>El carrito está vacío</p>}

        {carrito.map((producto) => (
          <div key={producto.id} className="item-carrito">
            <div className="item-info">
              <span>{producto.nombre}</span>

              <div className="item-controles">
                <button onClick={() => disminuirCantidad(producto.id)}>-</button>
                <span>{producto.cantidad}</span>
                <button onClick={() => aumentarCantidad(producto.id)}>+</button>

                <span>
                  S/{(producto.precio * producto.cantidad).toFixed(2)}
                </span>

                <button
                  className="eliminar"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  <img src={trashIcon} alt="Eliminar" className="trash-icon" />
                </button>
              </div>

              <small>S/{producto.precio.toFixed(2)} / unidad</small>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="footer-resumen">
        <div className="formulario-cliente">
          <label>Nombre del cliente:</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Opcional"
          />

          <label>Total pagado por el cliente:</label>
          <input
            type="number"
            value={pagoCliente}
            onChange={(e) => setPagoCliente(Number(e.target.value))}
            placeholder="Ej: 50"
          />

          <label>Cambio al cliente:</label>
          <input type="text" value={`S/${vuelto.toFixed(2)}`} disabled />
        </div>

        <div className="total">
          <strong>TOTAL A PAGAR: S/{totalPagar.toFixed(2)}</strong>
        </div>

        <div className="metodo-pago-container">
          <button
            className="btn pago efectivo"
            disabled={loading}
            onClick={() => registrarVenta("Efectivo")}
          >
            Efectivo
          </button>

          <button
            className="btn pago mixto"
            disabled={loading}
            onClick={() => registrarVenta("Mixto")}
          >
            Mixto
          </button>

          <button
            className="btn pago yape"
            disabled={loading}
            onClick={() => registrarVenta("Yape")}
          >
            Yape
          </button>

          <button
            className="btn pago plin"
            disabled={loading}
            onClick={() => registrarVenta("Plin")}
          >
            Plin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumenDeOrden;
