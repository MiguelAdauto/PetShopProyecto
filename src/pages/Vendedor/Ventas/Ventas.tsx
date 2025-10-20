import BusquedaProductoV from './BusquedaProductoV';
import CategoriesTabs from '../../../components/Categorías/CategoriesTabs';
import SubCategoriesTabs from '../../../components/SubCategorias/SubCategoriesTabs';
import ResumenDeOrden from '../../../components/Carrito/ResumenDeOrden';
import './Ventas.css';
import producto1 from '../../../assets/cuerda.jpg';
import { useState } from 'react';

const productos = [
  { id: 1, nombre: 'cuerda de gato con forma de cilindro', precio: 10.99, imagen: producto1 },
  { id: 2, nombre: 'Producto 2', precio: 12.99, imagen: producto1 },
  { id: 3, nombre: 'Producto 3', precio: 8.99, imagen: producto1 },
  { id: 4, nombre: 'Producto 4', precio: 15.0, imagen: producto1 },
  { id: 5, nombre: 'Producto 5', precio: 7.5, imagen: 'https://via.placeholder.com/150' },
  { id: 6, nombre: 'Producto 6', precio: 11.25, imagen: 'https://via.placeholder.com/150' },
  { id: 7, nombre: 'Producto 7', precio: 9.99, imagen: 'https://via.placeholder.com/150' },
  { id: 8, nombre: 'Producto 8', precio: 14.99, imagen: 'https://via.placeholder.com/150' },
  { id: 9, nombre: 'Producto 9', precio: 11.25, imagen: 'https://via.placeholder.com/150' },
  { id: 10, nombre: 'Producto 10', precio: 9.99, imagen: 'https://via.placeholder.com/150' },
  { id: 11, nombre: 'Producto 11', precio: 14.99, imagen: 'https://via.placeholder.com/150' },
];

type ProductoCarrito = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
};

const Ventas = () => {
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  const [categoria, setCategoria] = useState<'Perros' | 'Gatos' | 'Mixto'>('Mixto');
  const [subcategoria, setSubcategoria] = useState<
    'Juguetes' | 'Aseo' | 'Accesorios' | 'Hogar' | 'Comederos'
  >('Juguetes');

  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = !filtros.nombre || p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    const coincideCodigo = !filtros.codigo || String(p.id).includes(filtros.codigo);
    return coincideNombre && coincideCodigo;
  });

  const agregarAlCarrito = (producto: { id: number; nombre: string; precio: number }) => {
    setCarrito((prev) => {
      const productoExistente = prev.find((p) => p.id === producto.id);
      if (productoExistente) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }];
      }
    });
  };

  return (
    <div className="ventas-container">
      <div className="productos-section">
        <BusquedaProductoV onBuscar={setFiltros} />

        <div className="productos-scroll">
          <div className="productos-grid">
            {productosFiltrados.map(({ id, nombre, precio, imagen }) => (
              <div
                key={id}
                className="producto-card"
                onClick={() => agregarAlCarrito({ id, nombre, precio })}
                style={{ cursor: 'pointer' }}
              >
                <img src={imagen} alt={nombre} className="producto-img" />
                <div className="producto-nombre">{nombre}</div>
                <div className="producto-precio">S/{precio.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '50%', marginTop: '1rem' }}>
          <CategoriesTabs selected={categoria} onChange={setCategoria} />
        </div>

        <SubCategoriesTabs selected={subcategoria} onChange={setSubcategoria} />
      </div>

      <div className="resumen-section">
        <ResumenDeOrden carrito={carrito} setCarrito={setCarrito} />
      </div>
    </div>
  );
};

export default Ventas;