import { useState } from 'react';
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaProductos from "./BusquedaProductos";
import cuerdaImg from '../../../assets/cuerda.jpg';
import Paginacion from "../../../components/Paginacion/Paginacion";
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
  tipo: ['Mixto', 'Perro', 'Gato'][index % 3],
  categoria: ['Juguete', 'Aseo', 'Accesorios'][index % 3],
  stock: Math.floor(Math.random() * 50 + 1),
}));
const ProductosListado = () => {
  const [productos, setProductos] = useState(datosProductos);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 7;

  const buscarProductos = (filtros: any) => {
    console.log("Aplicando filtros (simulado):", filtros);

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
    <div style={{ display: 'flex', gap: '8px' }}>
      <i
        className="bi bi-display icono-opcion"
        title="Descargar PDF"
        onClick={() => console.log("Descargar PDF de venta:", fila)}
        style={{ cursor: "pointer", fontSize: "20px" }}
      ></i>
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

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaProductos onBuscar={buscarProductos} />

      <TablaGenerica
        columnas={columnasProductos}
        datos={productosPaginados}
        renderOpciones={renderOpciones}
        renderCell={renderCustomCell}
      />

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}
        tipo="vendedor"
      />
    </div>
  );
};

export default ProductosListado;