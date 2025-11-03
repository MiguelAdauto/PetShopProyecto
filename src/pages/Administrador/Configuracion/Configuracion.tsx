import { useNavigate } from "react-router-dom";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Asegúrate de tener Bootstrap Icons
import "./Configuracion.css";

const Configuracion: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="configuracion-page">
      <div className="cards-container">
        {/* Tarjeta Categorías */}
        <div
          className="config-card"
          onClick={() => navigate("/admin/categorias")}
        >
          <i className="bi bi-tags config-icon"></i>
          <h2>Categorías</h2>
        </div>

        {/* Tarjeta Usuarios */}
        <div className="config-card"
        onClick={() => navigate("/admin/usuarios")}
        >
          <i className="bi bi-people config-icon"></i>
          <h2>Usuarios</h2>
        </div>

        {/* Tarjeta N° Serie */}
        <div className="config-card">
          <i className="bi bi-upc-scan config-icon"></i>
          <h2>N° Serie</h2>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
