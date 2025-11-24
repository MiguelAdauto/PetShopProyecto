import React, { useState, useEffect } from "react";
import "./Serie.css";
import FormSerie from "./FormSerie";

const Serie: React.FC = () => {
  const [serie, setSerie] = useState("CARGANDO..."); // solo la serie editable
  const [correlativo, setCorrelativo] = useState<number>(0); // correlativo actual
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    // Obtener serie y correlativo actual desde el backend
    fetch("http://127.0.0.1:5000/ventas/serie")
      .then((res) => res.json())
      .then((data) => {
        if (data.serie && data.correlativo !== undefined) {
          setSerie(data.serie); // solo la serie
          setCorrelativo(data.correlativo); // correlativo actual
        }
      })
      .catch(() => setSerie("Error al cargar"));
  }, []);

  const handleActualizarSerie = (nuevaSerie: string) => {
    setSerie(nuevaSerie);
    setEditando(false);
    // Opcional: aquí podrías mostrar un alert o feedback
  };

  return (
    <div className="serie-container">
      <h2>Configuración de Serie</h2>

      {!editando ? (
        <div className="serie-actual">
          <p><strong>Serie actual:</strong> {serie}</p>
          <p><strong>Correlativo actual:</strong> {String(correlativo).padStart(6, "0")}</p>

          <button className="btn btn-primary" onClick={() => setEditando(true)}>
            Editar serie
          </button>
        </div>
      ) : (
        <FormSerie
          serieActual={serie}
          onCancelar={() => setEditando(false)}
          onGuardar={handleActualizarSerie}
        />
      )}
    </div>
  );
};

export default Serie;
