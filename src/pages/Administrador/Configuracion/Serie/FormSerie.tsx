import React, { useState } from "react";
import "./Serie.css";

interface FormSerieProps {
  correlativoActual: number;
  onGuardar: (nuevoCorrelativo: number) => void;
  onCancelar: () => void;
}

const FormSerie: React.FC<FormSerieProps> = ({
  correlativoActual,
  onGuardar,
  onCancelar,
}) => {
  const [nuevoCorrelativo, setNuevoCorrelativo] = useState(
    String(correlativoActual)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoNumero = parseInt(nuevoCorrelativo, 10);

    if (isNaN(nuevoNumero) || nuevoNumero < 0) {
      alert("Ingrese un correlativo válido");
      return;
    }

    try {
      await fetch("http://127.0.0.1:5000/ventas/correlativo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correlativo: nuevoNumero,
        }),
      });

      onGuardar(nuevoNumero);
    } catch (error) {
      console.error("Error actualizando correlativo:", error);
    }
  };

  return (
    <form className="form-serie" onSubmit={handleSubmit}>
      <label>Nuevo correlativo</label>

      <input
        type="number"
        value={nuevoCorrelativo}
        onChange={(e) => setNuevoCorrelativo(e.target.value)}
        placeholder="Ej: 15"
      />

      <div className="form-buttons">
        <button type="submit" className="btn btn-success">
          Guardar
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormSerie;
