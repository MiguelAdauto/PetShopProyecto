import React from 'react';
import './ModalProducto.css';  // Asegúrate de tener la ruta correcta para los estilos

interface Producto {
  imagen: string;
  codigo: string;
  nombre: string;
  precioCompra: string;
  precioVenta: string;
  precioTotal: string;
  tipo: string;
  categoria: string;
  stock: number;
}

interface ModalProductoProps {
  producto: Producto | null;
  onClose: () => void;
}

const ModalProducto: React.FC<ModalProductoProps> = ({ producto, onClose }) => {
  if (!producto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Botón de cerrar */}
        <button className="close-button" onClick={onClose}>X</button>

        {/* Título */}
        <h2>Detalles del Producto</h2>

        <div className="modal-body">
          {/* Imagen del producto */}
          <img src={producto.imagen} alt={producto.nombre} className="modal-image" />

          {/* Información del producto */}
          <div className="modal-info">
            <p><strong>Código:</strong> {producto.codigo}</p>
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Precio Compra:</strong> S/. {producto.precioCompra}</p>
            <p><strong>Precio Venta:</strong> S/. {producto.precioVenta}</p>
            <p><strong>Precio Total:</strong> S/. {producto.precioTotal}</p>
            <p><strong>Tipo:</strong> {producto.tipo}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Stock:</strong> {producto.stock} unidades
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProducto;
