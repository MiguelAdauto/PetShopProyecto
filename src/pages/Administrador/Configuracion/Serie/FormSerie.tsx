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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaSerie.trim() === "") return;
    onGuardar(nuevaSerie);
  };

  return (
    <form className="form-serie" onSubmit={handleSubmit}>
      <label>Nueva serie</label>
      <input
        type="text"
        value={nuevaSerie}
        onChange={(e) => setNuevaSerie(e.target.value.toUpperCase())}
        placeholder="Ej: B002"
      />
      <div className="form-buttons">
        <button type="submit" className="btn btn-success">
          <i className="bi bi-save"></i> Guardar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormSerie;
