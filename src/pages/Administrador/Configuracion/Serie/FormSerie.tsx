import React, { useState } from "react";
import "./Serie.css";

interface FormSerieProps {
  serieActual: string;
  onGuardar: (nuevaSerie: string) => void;
  onCancelar: () => void;
}

const FormSerie: React.FC<FormSerieProps> = ({
  serieActual,
  onGuardar,
  onCancelar,
}) => {
  const [nuevaSerie, setNuevaSerie] = useState(serieActual);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nuevaSerie.trim() === "") return;

    try {
      await fetch("http://127.0.0.1:5000/ventas/serie", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serie: nuevaSerie, // Ej: "B0000035"
        }),
      });

      onGuardar(nuevaSerie);

    } catch (error) {
      console.error("Error actualizando serie:", error);
    }
  };

  return (
    <form className="form-serie" onSubmit={handleSubmit}>
      <label>Nueva serie</label>
      <input
        type="text"
        value={nuevaSerie}
        onChange={(e) => setNuevaSerie(e.target.value.toUpperCase())}
        placeholder="Ej: B0000035"
      />

      <div className="form-buttons">
        <button type="submit" className="btn btn-success">
          Guardar
        </button>

        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormSerie;
