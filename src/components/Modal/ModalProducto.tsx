import React, { useEffect, useState } from 'react';
import api from "../../api/api"; 
import './ModalProducto.css';

interface Producto {
  id: number;
  imagen: string;
  codigo: string;
  nombre: string;
  precio_compra: string;
  precio_venta: string;
  stock: number;
  categoria: string;
  subcategoria: string;
  activo: number; // 1 activo, 0 inactivo
}

interface ModalProductoProps {
  producto: Producto | null;
  onClose: () => void;
  onEstadoActualizado?: () => void;
}

const ModalProducto: React.FC<ModalProductoProps> = ({ producto, onClose, onEstadoActualizado }) => {
  const [productoData, setProductoData] = useState<Producto | null>(producto);

  const rol = localStorage.getItem("rol");

  useEffect(() => {
    setProductoData(producto);
  }, [producto]);

  if (!productoData) return null;

  // -------------------------------------
  // 🔥 ACTIVAR / DESACTIVAR PRODUCTO
  // -------------------------------------
  const cambiarEstado = async () => {
    const nuevoEstado = productoData.activo === 1 ? 0 : 1;
    const accion = nuevoEstado === 1 ? "activar" : "desactivar";

    const confirmar = window.confirm(`¿Seguro que deseas ${accion} este producto?`);
    if (!confirmar) return;

    try {
      await api.put(`/productos/estado/${productoData.id}`, { activo: nuevoEstado });

      setProductoData(prev => prev ? { ...prev, activo: nuevoEstado } : prev);

      if (onEstadoActualizado) onEstadoActualizado();

      alert(`Producto ${accion} correctamente.`);
    } catch (error) {
      console.error(error);
      alert(`Error al ${accion} el producto`);
    }
  };

  // Convertir precios a número
  const precioCompra = parseFloat(productoData.precio_compra) || 0;
  const precioVenta = parseFloat(productoData.precio_venta) || 0;
  const precioTotal = (precioCompra * productoData.stock).toFixed(2);

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-button" onClick={onClose}>X</button>
        <h2>Detalles del Producto</h2>

        <div className="modal-body">
          <img 
            src={`http://localhost:5000/uploads/${productoData.imagen}`} 
            alt={productoData.nombre} 
            className="modal-image" 
          />

          <div className="modal-info">
            <p><strong>Código:</strong> {productoData.codigo}</p>
            <p><strong>Nombre:</strong> {productoData.nombre}</p>
            <p><strong>Precio Compra:</strong> S/. {precioCompra.toFixed(2)}</p>
            <p><strong>Precio Venta:</strong> S/. {precioVenta.toFixed(2)}</p>
            <p><strong>Precio Total:</strong> S/. {precioTotal}</p>
            <p><strong>Categoría:</strong> {productoData.categoria}</p>
            <p><strong>Subcategoría:</strong> {productoData.subcategoria}</p>
            <p><strong>Stock:</strong> {productoData.stock} unidades</p>

            <p>
              <strong>Estado:</strong>{" "}
              <span
                style={{
                  padding: "3px 8px",
                  borderRadius: "5px",
                  color: "white",
                  background: productoData.activo === 1 ? "#4caf50" : "#f44336"
                }}
              >
                {productoData.activo === 1 ? "Activo" : "Inactivo"}
              </span>
            </p>

            {/* 🔥 Botón solo ADMIN */}
            {rol === "admin" && (
              <button 
                className="btn-desactivar"
                onClick={cambiarEstado}
              >
                {productoData.activo === 1 ? "Desactivar" : "Activar"}
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ModalProducto;
