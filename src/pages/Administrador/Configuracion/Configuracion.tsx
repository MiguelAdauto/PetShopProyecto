import { useNavigate, Outlet } from "react-router-dom";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
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
        <div
          className="config-card"
          onClick={() => navigate("/admin/usuarios")}
        >
          <i className="bi bi-people config-icon"></i>
          <h2>Usuarios</h2>
        </div>

        {/* Tarjeta N° Serie */}
        <div
          className="config-card"
          onClick={() => navigate("/admin/configuracion/serie")}
        >
          <i className="bi bi-upc-scan config-icon"></i>
          <h2>N° Serie</h2>
        </div>
      </div>

      {/* Outlet permite renderizar la subruta (Serie.tsx) dentro de esta página */}
      <Outlet />
    </div>
  );
};

export default Configuracion;
