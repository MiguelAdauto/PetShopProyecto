import React, { useState, useEffect } from "react";
import "./Serie.css";
import FormSerie from "./FormSerie";

const Serie: React.FC = () => {
  const [serie, setSerie] = useState("CARGANDO...");
  const [correlativo, setCorrelativo] = useState<number>(0);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    // Obtener serie + correlativo desde el backend
    fetch("http://127.0.0.1:5000/ventas/serie")
      .then((res) => res.json())
      .then((data) => {
        if (data.serie && data.correlativo !== undefined) {
          setSerie(data.serie);
          setCorrelativo(data.correlativo);
        }
      })
      .catch(() => setSerie("Error al cargar"));
  }, []);

  // 🔥 Se actualiza SOLO el correlativo cuando guardas
  const handleActualizarCorrelativo = (nuevoCorrelativo: number) => {
    setCorrelativo(nuevoCorrelativo);
    setEditando(false);
  };

  return (
    <div className="serie-container">
      <h2>Configuración de Serie</h2>

      {!editando ? (
        <div className="serie-actual">
          <p>
            <strong>Serie actual:</strong> {serie}
          </p>

          <p>
            <strong>Correlativo actual:</strong>{" "}
            {String(correlativo).padStart(6, "0")}
          </p>

          <button className="boton-agregar-admin" onClick={() => setEditando(true)}>
            Editar correlativo
          </button>
        </div>
      ) : (
        <FormSerie
          correlativoActual={correlativo}
          onCancelar={() => setEditando(false)}
          onGuardar={handleActualizarCorrelativo}
        />
      )}
    </div>
  );
};

export default Serie;
