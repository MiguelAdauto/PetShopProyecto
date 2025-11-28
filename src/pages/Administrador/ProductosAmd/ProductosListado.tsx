import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaProductos from "./BusquedaProductos";
import Paginacion from "../../../components/Paginacion/Paginacion";
import api from "../../../api/api";
import ModalProducto from "../../../components/Modal/ModalProducto";
import "../../../Styles/PaginasListado.css";

interface FiltrosProductos {
  codigo: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
}

const columnasProductosAdmin = [
  { key: "id", label: "#", sortable: true },
  { key: "imagen", label: "Imagen" },
  { key: "codigo", label: "Código", sortable: true },
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "precio_compra", label: "Precio Compra", sortable: true },
  { key: "precio_venta", label: "Precio Venta", sortable: true },
  { key: "categoria", label: "Categoría", sortable: true },
  { key: "subcategoria", label: "Subcategoría", sortable: true },
  { key: "stock", label: "Stock", sortable: true },
];

const ProductosListado = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 6;
  const navigate = useNavigate();

  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);
  const [filtros, setFiltros] = useState<FiltrosProductos>({
    codigo: "",
    nombre: "",
    categoria: "",
    subcategoria: "",
  });

  const cargarProductos = async () => {
    try {
      const response = await api.get("/productos/");
      if (response.data.status === "ok") {
        setProductos(response.data.productos);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleBuscar = (nuevosFiltros: FiltrosProductos) => {
    setFiltros(nuevosFiltros);
    setPaginaActual(1);
  };

  const productosFiltrados = productos.filter((p) => {
    return (
      (filtros.codigo === "" || p.codigo.includes(filtros.codigo)) &&
      (filtros.nombre === "" || p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
      (filtros.categoria === "" || p.categoria === filtros.categoria) &&
      (filtros.subcategoria === "" || p.subcategoria === filtros.subcategoria)
    );
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / filasPorPagina);
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, fin);

  const renderOpciones = (fila: any) => (
    <div style={{ display: "flex", gap: "12px" }}>
      <button title="Ver Producto" onClick={() => setProductoSeleccionado(fila)} style={{ cursor: "pointer", background: "none", border: "none" }}>
        <i className="bi bi-eye" style={{ fontSize: "20px", color: "#000" }}></i>
      </button>

      <button title="Editar Producto" onClick={() => navigate("/admin/editar-producto", { state: fila })} style={{ cursor: "pointer", background: "none", border: "none" }}>
        <i className="bi bi-pencil-square" style={{ fontSize: "18px", color: "#000" }}></i>
      </button>

      <button
        title="Eliminar Producto"
        onClick={async () => {
          if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            await api.delete(`/productos/${fila.id}`);
            cargarProductos();
          }
        }}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-trash" style={{ fontSize: "18px", color: "#000" }}></i>
      </button>
    </div>
  );

  const renderCustomCell = (key: string, value: any) => {
    if (key === "imagen") {
      if (!value) return <span>No hay imagen</span>;
      const src = `http://localhost:5000/uploads/${value}`;
      return <img src={src} alt="Producto" style={{ width: 50, height: 50 }} />;
    }
    return value;
  };

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaProductos onBuscar={handleBuscar} />

      <TablaGenerica
        columnas={columnasProductosAdmin}
        datos={productosPaginados}
        renderOpciones={renderOpciones}
        renderCell={renderCustomCell}
      />

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}
        tipo="admin"
      />

      {productoSeleccionado && (
        <ModalProducto
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          onEstadoActualizado={cargarProductos}
        />
      )}
    </div>
  );
};

export default ProductosListado;
