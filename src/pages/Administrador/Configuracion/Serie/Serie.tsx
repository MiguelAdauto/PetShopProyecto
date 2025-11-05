import React, { useState } from "react";
import "./Serie.css";
import FormSerie from "./FormSerie";

const Serie: React.FC = () => {
  const [serie, setSerie] = useState("B001"); // valor inicial
  const [editando, setEditando] = useState(false);

  const handleActualizarSerie = (nuevaSerie: string) => {
    setSerie(nuevaSerie);
    setEditando(false);
  };

  return (
    <div className="serie-container">
      <h2>Configuración de Serie</h2>

      {!editando ? (
        <div className="serie-actual">
          <p><strong>Serie actual:</strong> {serie}</p>
          <button className="btn btn-primary" onClick={() => setEditando(true)}>
            <i className="bi bi-pencil"></i> Editar serie
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
