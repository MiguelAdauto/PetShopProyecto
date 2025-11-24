import { useEffect, useState } from "react";

import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaProductos from "./BusquedaProductos";
import Paginacion from "../../../components/Paginacion/Paginacion";
import ModalProducto from "../../../components/Modal/ModalProducto";
import api from "../../../api/api"; // Axios config
import "../../../Styles/PaginasListado.css";

const columnasProductosVendedor = [
  { key: "id", label: "#", sortable: true },
  { key: "imagen", label: "Imagen" },
  { key: "codigo", label: "Código", sortable: true },
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "precio_venta", label: "Precio Venta", sortable: true },
  { key: "categoria", label: "Categoría", sortable: true },
  { key: "subcategoria", label: "Subcategoría", sortable: true },
  { key: "stock", label: "Stock", sortable: true },
];

const ProductosListado = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
  const filasPorPagina = 6;

  // ✅ Obtener productos desde el backend
 const cargarProductos = async () => {
  try {
    const response = await api.get("/productos/");
    if (response.data.status === "ok") {
      console.log("Productos API:", response.data.productos);

      // Aseguramos que los precios sean números válidos
      const productosFormateados = response.data.productos.map((producto: any) => ({
        ...producto,
        precio_venta: isNaN(parseFloat(producto.precio_venta)) ? 'No disponible' : parseFloat(producto.precio_venta),
        precio_compra: isNaN(parseFloat(producto.precio_compra)) ? 'No disponible' : parseFloat(producto.precio_compra),
      }));

      setProductos(productosFormateados); 
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

  useEffect(() => {
    cargarProductos();
  }, []); // Cargar productos solo cuando se monta el componente

  // Paginación
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const productosPaginados = productos.slice(inicio, fin);
  const totalPaginas = Math.ceil(productos.length / filasPorPagina);

  // Renderiza las opciones para cada fila
  const renderOpciones = (fila: any) => (
    <div style={{ display: "flex", gap: "12px" }}>
      <button
        title="Ver Detalles"
        onClick={() => setProductoSeleccionado(fila)} // Pasamos el producto completo
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-eye" style={{ fontSize: "20px", color: '#000000ff' }}></i>
      </button>
    </div>
  );

  // Renderiza las celdas de la tabla, personalizando la celda de la imagen
  const renderCustomCell = (key: string, value: any) => {
    if (key === "imagen") {
      if (!value) return <span>No hay imagen</span>;
      const src = `http://localhost:5000/uploads/${value}`; // Usas el nombre del archivo de la imagen
      return <img src={src} alt="Producto" style={{ width: 50, height: 50 }} />;
    }
    return value;
  };

  return (
    <div className="contenedor-pagina-listado">
      {/* Buscador */}
      <BusquedaProductos onBuscar={() => {}} />

      {/* Tabla de productos */}
      <TablaGenerica
        columnas={columnasProductosVendedor}
        datos={productosPaginados}
        renderOpciones={renderOpciones} // Solo la opción de "Ver Detalles"
        renderCell={renderCustomCell} // Personaliza las celdas, por ejemplo, para la imagen
      />

      {/* Paginación */}
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}
        tipo="vendedor" // Se puede pasar un tipo si quieres diferenciar entre admin y vendedor
      />

      {/* ModalProducto */}
      <ModalProducto
        producto={productoSeleccionado} // Pasamos el producto seleccionado
        onClose={() => setProductoSeleccionado(null)} // Lógica para cerrar el modal
        onEstadoActualizado={cargarProductos}
      />
    </div>
  );
};

export default ProductosListado;
