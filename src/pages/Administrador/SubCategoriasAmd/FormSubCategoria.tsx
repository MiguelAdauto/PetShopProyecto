import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/AgregarGlobal.css";

interface SubCategoriaFormProps {
  modo?: "agregar" | "editar";
}

const FormSubCategoria: React.FC<SubCategoriaFormProps> = ({ modo = "agregar" }) => {
  const location = useLocation();
  const datosIniciales = location.state as { id?: number; nombre: string; descripcion: string } | undefined;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (modo === "editar" && datosIniciales) {
      setNombre(datosIniciales.nombre);
      setDescripcion(datosIniciales.descripcion);
    }
  }, [modo, datosIniciales]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subCategoria = { nombre, descripcion };

    try {
      let response;
      if (modo === "editar" && datosIniciales?.id) {
        response = await fetch(`http://localhost:5000/subcategorias/${datosIniciales.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subCategoria),
        });
      } else {
        response = await fetch("http://localhost:5000/subcategorias/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subCategoria),
        });
      }

      const data = await response.json();
      if (data.status === "ok") {
        alert(data.message);
        window.history.back(); // vuelve al listado
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al guardar subcategoría:", error);
      alert("Ocurrió un error al conectar con el servidor.");
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
            <label>Nombre: <i className="bi bi-box-arrow-down-left"></i></label>
            <input
              type="text"
              placeholder="Inserte Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Descripción: <i className="bi bi-box-arrow-down-left"></i></label>
            <input
              type="text"
              placeholder="Inserte Descripción o Ubicación"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
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
