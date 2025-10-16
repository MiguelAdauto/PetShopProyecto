import { useState } from 'react';
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaProductos from "./BusquedaProductos";
import cuerdaImg from '../../../assets/cuerda.jpg';
import verIcon from '../../../assets/ver.svg';
import '../../../Styles/PaginasListado.css';

const columnasProductos = [
  { key: 'id', label: '#', sortable: true },
  { key: 'imagen', label: 'Imagen' },
  { key: 'codigo', label: 'Código', sortable: true },
  { key: 'nombre', label: 'Nombre', sortable: true },
  { key: 'precio', label: 'Precio', sortable: true },
  { key: 'tipo', label: 'Tipo', sortable: true },
  { key: 'categoria', label: 'Categoría', sortable: true },
  { key: 'stock', label: 'Stock', sortable: true },
];

const datosProductos = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  imagen: cuerdaImg,
  codigo: `P${String(index + 1).padStart(3, '0')}`,
  nombre: `Producto ${index + 1}`,
  precio: (Math.random() * 100).toFixed(2),
  tipo: ['Deporte', 'Hogar', 'Higiene'][index % 3],
  categoria: ['Fitness', 'Fútbol', 'Limpieza'][index % 3],
  stock: Math.floor(Math.random() * 50 + 1),
}));

const renderOpciones = (fila: any) => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <img
      src={verIcon}
      alt="Ver producto"
      title="Ver producto"
      className="icono-opcion"
      onClick={() => console.log('Ver producto:', fila)}
    />
  </div>
);

const renderCustomCell = (key: string, value: any) => {
  if (key === 'imagen') {
    return (
      <img
        src={value}
        alt="Producto"
        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
      />
    );
  }
  return value;
};

const ProductosListado = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 7;

  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const productosPaginados = datosProductos.slice(inicio, fin);
  const totalPaginas = Math.ceil(datosProductos.length / filasPorPagina);

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaProductos />

      <TablaGenerica
        columnas={columnasProductos}
        datos={productosPaginados}
        renderOpciones={renderOpciones}
        renderCell={renderCustomCell}
      />

      <div className="paginacion">
        <button
          onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
          disabled={paginaActual === 1}
        >
          ← Anterior
        </button>

        <span>Página {paginaActual} de {totalPaginas}</span>

        <button
          onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default ProductosListado;