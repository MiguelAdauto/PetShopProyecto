import SearchBar from '../../../components/BarraBusqueda/SearchBar';
import CategoriesTabs from '../../../components/Categorías/CategoriesTabs';
import SubCategoriesTabs from '../../../components/SubCategorias/SubCategoriesTabs';
import ResumenDeOrden from '../../../components/Carrito/ResumenDeOrden';
import './Ventas.css';
import producto1 from '../../../assets/cuerda.jpg';
import { useState } from 'react';

const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10.99, imagen: producto1 },
  { id: 2, nombre: 'Producto 2', precio: 12.99, imagen: 'https://via.placeholder.com/150' },
  { id: 3, nombre: 'Producto 3', precio: 8.99, imagen: 'https://via.placeholder.com/150' },
  { id: 4, nombre: 'Producto 4', precio: 15.0, imagen: 'https://via.placeholder.com/150' },
  { id: 5, nombre: 'Producto 5', precio: 7.5, imagen: 'https://via.placeholder.com/150' },
  { id: 6, nombre: 'Producto 6', precio: 11.25, imagen: 'https://via.placeholder.com/150' },
  { id: 7, nombre: 'Producto 7', precio: 9.99, imagen: 'https://via.placeholder.com/150' },
  { id: 8, nombre: 'Producto 8', precio: 14.99, imagen: 'https://via.placeholder.com/150' },
];

const Ventas = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [categoria, setCategoria] = useState<'Perros' | 'Gatos' | 'Mixto'>('Mixto');
  const [subcategoria, setSubcategoria] = useState<'Juguetes' | 'Aseo' | 'Accesorios' | 'Hogar' | 'Comederos'>('Juguetes');
  return (
    <div className="ventas-container">
      {/* Columna izquierda: productos */}
      <div className="productos-section">
        {/* Buscador */}
        <SearchBar
          nombre={nombre}
          codigo={codigo}
          onNombreChange={setNombre}
          onCodigoChange={setCodigo}
        />

        {/* Lista de productos con scroll */}
        <div className="productos-scroll">
          <div className="productos-grid">
            {productos.slice(0, 6).map(({ id, nombre, precio, imagen }) => (
              <div key={id} className="producto-card">
                <img src={imagen} alt={nombre} className="producto-img" />
                <div className="producto-nombre">{nombre}</div>
                <div className="producto-precio">s/{precio.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorías alineadas a la izquierda */}
        <div style={{ width: '50%', marginTop: '1rem' }}>
          <CategoriesTabs selected={categoria} onChange={setCategoria} />
        </div>

        {/* Subcategorías a todo el ancho */}
        <SubCategoriesTabs selected={subcategoria} onChange={setSubcategoria} />
      </div>

      {/* Columna derecha: resumen de venta */}
      <div className="resumen-section">
        <ResumenDeOrden />
      </div>
    </div>
  );
};

export default Ventas;