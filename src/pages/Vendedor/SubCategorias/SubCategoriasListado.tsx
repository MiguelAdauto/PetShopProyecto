import { useState, useEffect } from "react";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import '../../../Styles/PaginasListado.css';

interface SubCategoria {
  id: number;
  nombre: string;
  descripcion: string;
  visible: number; // 0 o 1
}

const columnasSubCategorias = [
  { key: "id", label: "ID", sortable: true },
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "descripcion", label: "Descripción", sortable: true },
];

const SubCategoriasListado = () => {
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchSubCategorias = async () => {
      try {
        const res = await fetch("http://localhost:5000/subcategorias");
        const data = await res.json();
        if (data.status === "ok") {
          setSubCategorias(data.subcategorias || []);
        }
      } catch (err) {
        console.error("Error cargando subcategorías:", err);
      } finally {
        setCargando(false);
      }
    };

    fetchSubCategorias();
  }, []);

  const toggleVisible = async (sub: SubCategoria) => {
    // Limitar a 5 visibles
    const visiblesActuales = subCategorias.filter(s => s.visible === 1).length;
    if (sub.visible === 0 && visiblesActuales >= 5) {
      alert("Solo puedes tener 5 subcategorías visibles.");
      return;
    }

    try {
      // Cambiar visible en backend
      const nuevoVisible = sub.visible === 1 ? 0 : 1;
      const res = await fetch(`http://localhost:5000/subcategorias/visibilidad/${sub.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: nuevoVisible })
      });
      const data = await res.json();
      if (data.status === "ok") {
        // Actualizar estado local
        setSubCategorias(subCategorias.map(s =>
          s.id === sub.id ? { ...s, visible: nuevoVisible } : s
        ));
      }
    } catch (err) {
      console.error("Error cambiando visibilidad:", err);
    }
  };

  if (cargando) return <p>Cargando subcategorías...</p>;

  return (
    <div className="contenedor-pagina-listado">
      <TablaGenerica
        columnas={columnasSubCategorias}
        datos={subCategorias}
        renderOpciones={(fila: SubCategoria) => (
          <button
            onClick={() => toggleVisible(fila)}
            style={{
              padding: "4px 8px",
              backgroundColor: fila.visible === 1 ? "#4caf50" : "#f0f0f0",
              color: fila.visible === 1 ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {fila.visible === 1 ? "Visible" : "Oculta"}
          </button>
        )}
      />
    </div>
  );
};

export default SubCategoriasListado;
