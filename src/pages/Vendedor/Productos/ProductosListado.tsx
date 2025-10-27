import { useState } from 'react';
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import cuerdaImg from '../../../assets/cuerda.jpg';
import BusquedaProductos from "./BusquedaProductos";
import Paginacion from "../../../components/Paginacion/Paginacion";
import ModalProducto from "../../../components/Modal/ModalProducto"; // Importamos el ModalProducto
import '../../../Styles/PaginasListado.css';

const columnasProductosAdmin = [
  { key: 'id', label: '#', sortable: true },
  { key: 'imagen', label: 'Imagen ' },
  { key: 'codigo', label: 'Código ', sortable: true },
  { key: 'nombre', label: 'Nombre ', sortable: true },
  { key: 'precioCompra', label: 'Precio Compra ', sortable: true },
  { key: 'precioVenta', label: 'Precio Venta ', sortable: true },
  { key: 'precioTotal', label: 'Precio Total ', sortable: true },
  { key: 'tipo', label: 'Tipo ', sortable: true },
  { key: 'categoria', label: 'Categoría ', sortable: true },
  { key: 'stock', label: 'Stock', sortable: true },
];

const datosProductos = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  imagen: cuerdaImg,
  codigo: `P${String(index + 1).padStart(3, '0')}`,
  nombre: `Producto ${index + 1}`,
  precioCompra: (Math.random() * 100).toFixed(2),
  precioVenta: (Math.random() * 100).toFixed(2),
  precioTotal: (Math.random() * 100).toFixed(2),
  tipo: ['Mixto', 'Perro', 'Gato'][index % 3],
  categoria: ['Juguete', 'Aseo', 'Accesorios'][index % 3],
  stock: Math.floor(Math.random() * 50 + 1),
}));

const ProductosListado = () => {
  const [productos, setProductos] = useState(datosProductos);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
  const filasPorPagina = 7;

  const buscarProductos = (filtros: any) => {
    const filtrados = datosProductos.filter(p => {
      const coincideCodigo = filtros.codigo === "" || p.codigo.toLowerCase().includes(filtros.codigo.toLowerCase());
      const coincideNombre = filtros.nombre === "" || p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
      const coincideTipo = filtros.tipo === "" || p.tipo === filtros.tipo;
      const coincideCategoria = filtros.categoria === "" || p.categoria === filtros.categoria;
      return coincideCodigo && coincideNombre && coincideTipo && coincideCategoria;
    });
    setProductos(filtrados);
    setPaginaActual(1);
  };

  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const productosPaginados = productos.slice(inicio, fin);
  const totalPaginas = Math.ceil(productos.length / filasPorPagina);

  const renderOpciones = (fila: any) => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        title="Ver Detalles"
        onClick={() => setProductoSeleccionado(fila)}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-eye" style={{ fontSize: "20px", color: '#000000ff' }}></i>
      </button>
    </div>
  );

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaProductos onBuscar={buscarProductos} />
      <TablaGenerica
        columnas={columnasProductosAdmin}
        datos={productosPaginados}
        renderOpciones={renderOpciones}
      />

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}
      />

      {/* Mostrar el modal si hay un producto seleccionado */}
      <ModalProducto
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />
    </div>
  );
};

export default ProductosListado;
