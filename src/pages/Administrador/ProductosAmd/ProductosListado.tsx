import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaProductos from "./BusquedaProductos";
import Paginacion from "../../../components/Paginacion/Paginacion";
import api from "../../../api/api";
import ModalProducto from "../../../components/Modal/ModalProducto"; 
import "../../../Styles/PaginasListado.css";

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

  // 👁️‍🗨️ Estado para modal
  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);

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

  // Paginación
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const productosPaginados = productos.slice(inicio, fin);
  const totalPaginas = Math.ceil(productos.length / filasPorPagina);

  // 🟦 Botones de acción
  const renderOpciones = (fila: any) => (
    <div style={{ display: "flex", gap: "12px" }}>
      
      {/* 🔵 Ver Producto (abre el modal) */}
      <button
        title="Ver Producto"
        onClick={() => setProductoSeleccionado(fila)}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-eye" style={{ fontSize: "20px", color: "#000" }}></i>
      </button>

      <button
        title="Editar Producto"
        onClick={() => navigate("/admin/editar-producto", { state: fila })}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
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

  // Render custom celda imagen
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
      <BusquedaProductos onBuscar={() => {}} />

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

      {/* 🟣 Modal de Producto */}
      {productoSeleccionado && (
        <ModalProducto
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          onEstadoActualizado={cargarProductos}   // 🔥 AQUÍ
        />
      )}
    </div>
  );
};

export default ProductosListado;
