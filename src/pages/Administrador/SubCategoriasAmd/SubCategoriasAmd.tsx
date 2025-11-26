import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaCategorias from "./BusquedaSubCategorias";
import Paginacion from "../../../components/Paginacion/Paginacion";
import "../../../Styles/PaginasListado.css";

interface SubCategoria {
  id: number;
  nombre: string;
  descripcion: string;
}

const columnasSubCategorias = [
  { key: "id", label: "ID", sortable: true },
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "descripcion", label: "Descripción", sortable: true },
];

const SubCategoriasAmd = () => {
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [filtradas, setFiltradas] = useState<SubCategoria[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 5;
  const navigate = useNavigate();

  // Cargar subcategorías desde el backend
  useEffect(() => {
    const fetchSubcategorias = async () => {
      try {
        const response = await fetch("http://localhost:5000/subcategorias/");
        const data = await response.json();
        if (data.status === "ok") {
          setSubCategorias(data.subcategorias);
          setFiltradas(data.subcategorias);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error al cargar subcategorías:", error);
      }
    };

    fetchSubcategorias();
  }, []);

  // Filtrar subcategorías desde buscador
  const handleBuscar = (filtros: { nombre: string }) => {
    const resultado = subCategorias.filter((sub) =>
      filtros.nombre === "" || sub.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
    );
    setFiltradas(resultado);
    setPaginaActual(1);
  };

  // Eliminar subcategoría
  const handleEliminar = async (fila: SubCategoria) => {
    if (!window.confirm(`¿Eliminar subcategoría "${fila.nombre}"?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/subcategorias/${fila.id}`, { method: "DELETE" });
      const data = await response.json();

      if (data.status === "ok") {
        alert("Subcategoría eliminada correctamente");
        setSubCategorias(subCategorias.filter((sub) => sub.id !== fila.id));
        setFiltradas(filtradas.filter((sub) => sub.id !== fila.id));
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al eliminar subcategoría:", error);
    }
  };

  // Paginación
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const subPaginadas = filtradas.slice(inicio, fin);
  const totalPaginas = Math.ceil(filtradas.length / filasPorPagina);

  // Botones de acciones
  const renderOpciones = (fila: SubCategoria) => (
    <div style={{ display: "flex", gap: "12px" }}>
      <button
        title="Editar Subcategoría"
        onClick={() => navigate(`/admin/editar-subcategoria/${fila.id}`, { state: fila })}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-pencil-square" style={{ fontSize: "18px", color: "#000" }}></i>
      </button>

      <button
        title="Eliminar Subcategoría"
        onClick={() => handleEliminar(fila)}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-trash" style={{ fontSize: "18px", color: "#000" }}></i>
      </button>
    </div>
  );

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaCategorias onBuscar={handleBuscar} />

      <TablaGenerica columnas={columnasSubCategorias} datos={subPaginadas} renderOpciones={renderOpciones} />

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}
        tipo="admin"
      />
    </div>
  );
};

export default SubCategoriasAmd;
  