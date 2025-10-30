import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/AgregarGlobal.css";

interface SubCategoriaFormProps {
  modo?: "agregar" | "editar";
}

const FormSubCategoria: React.FC<SubCategoriaFormProps> = ({ modo = "agregar" }) => {
  const location = useLocation();
  const datosIniciales = location.state as { nombre: string; descripcion: string } | undefined;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (modo === "editar" && datosIniciales) {
      setNombre(datosIniciales.nombre);
      setDescripcion(datosIniciales.descripcion);
    }
  }, [modo, datosIniciales]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subCategoria = { nombre, descripcion };

    if (modo === "editar") {
      console.log("Subcategoría actualizada:", subCategoria);
    } else {
      console.log("Subcategoría registrada:", subCategoria);
    }
  };

  const handleReset = () => {
    setNombre("");
    setDescripcion("");
  };

  return (
    <div className="StyleAgregarAmd">
      <button type="button" className="volver-btn" onClick={() => window.history.back()}>
        <i className="bi bi-chevron-compact-left" style={{ marginRight: "8px" }}></i> Volver
      </button>
      <h2>{modo === "editar" ? "Editar Subcategoría" : "Agregar Subcategoría"}</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-row">
          <div className="input-group">
            <label>Nombre <i className="bi bi-box-arrow-down-left"></i></label>
            <input
              type="text"
              placeholder="nombre de la subcategoría"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required/>
          </div>

          <div className="input-group">
            <label>Descripción <i className="bi bi-box-arrow-down-left"></i></label>
            <input
              type="text"
              placeholder="descripción o ubicación de la subcategoría"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}/>
          </div>
        </div>

        <div className="botones-row">
          <button type="submit" className="guardar-btn">
            <i className="bi bi-floppy-fill" style={{ marginRight: "8px" }}></i>
            {modo === "editar" ? "Actualizar" : "Guardar"}
          </button>
          <button type="reset" className="limpiar-btn">
            <i className="bi bi-arrow-counterclockwise" style={{ marginRight: "9px" }}></i>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSubCategoria;
