import { useState } from 'react';
import trashIcon from '../../assets/trash.svg';
import './ResumenDeOrden.css';

type ProductoCarrito = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
};

const ResumenDeOrden = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([
    { id: 1, nombre: 'Cama de perro', cantidad: 2, precio: 10 },
    { id: 2, nombre: 'Cama de gato', cantidad: 1, precio: 10 },
    { id: 2, nombre: 'Cama de gato', cantidad: 3, precio: 10 },
  ]);

  const [cliente, setCliente] = useState('');
  const [pagoCliente, setPagoCliente] = useState<number | ''>('');

  const totalPagar = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
  const vuelto = pagoCliente !== '' ? Math.max(pagoCliente - totalPagar, 0) : 0;

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

  return (
    <div className="resumen-orden">
      <h2>RESUMEN DE LA ORDEN</h2>
      <hr />

      {carrito.map((producto) => (
        <div key={producto.id} className="item-carrito">
          <div className="item-info">
            <span>{producto.nombre}</span>
            <div className="item-controles">
              <button onClick={() => disminuirCantidad(producto.id)}>-</button>
              <span>{producto.cantidad}</span>
              <button onClick={() => aumentarCantidad(producto.id)}>+</button>
              <span>S/{(producto.precio * producto.cantidad).toFixed(2)}</span>
              <button className="eliminar" onClick={() => eliminarProducto(producto.id)}>
                <img src={trashIcon} alt="Eliminar" className="trash-icon" />
              </button>
            </div>
            <small>S/{producto.precio.toFixed(2)} / unidad</small>
          </div>
        </div>
      ))}

      <hr />

      <div className="formulario-cliente">
        <label>Nombre del cliente:</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="(opcional)"
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
         <button className="btn pago efectivo">Efectivo</button>
         <button className="btn pago mixto">Mixto</button>
         <button className="btn pago yape">Yape</button>
         <button className="btn pago plin">Plin</button>
        </div>
    </div>
  );
};

export default ResumenDeOrden;
