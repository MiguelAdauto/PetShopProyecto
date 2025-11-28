import React from "react";
import { useNavigate } from "react-router-dom"; // si usas react-router

type Sale = {
  fecha: string;
  producto: string;
  sub: string;
  total: string;
  estado: string;
};

type SalesTableProps = {
  data: Sale[];
  title?: string;
  limit?: number;
};

const SalesTable: React.FC<SalesTableProps> = ({ data, title, limit = 3 }) => {
  const navigate = useNavigate();

  const limitedData = data.slice(0, limit); 

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        overflowX: "auto",
      }}
    >
      {title && <h2 style={{ marginBottom: 15 }}>{title}</h2>}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          minWidth: 600,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f9fafc", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: 10 }}>Fecha</th>
            <th style={{ padding: 10 }}>Producto</th>
            <th style={{ padding: 10 }}>Subcategoría</th>
            <th style={{ padding: 10 }}>Total</th>
            <th style={{ padding: 10 }}>Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {limitedData.map((h, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 10 }}>{h.fecha}</td>
              <td style={{ padding: 10 }}>{h.producto}</td>
              <td style={{ padding: 10 }}>{h.sub}</td>
              <td style={{ padding: 10 }}>{h.total}</td>
              <td style={{ padding: 10 }}>{h.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 Botón para ver más */}
      {data.length > limit && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            onClick={() => navigate("/admin/listado-ventas")} // futura ruta
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => ((e.currentTarget.style.backgroundColor = "#0056b3"))}
            onMouseOut={(e) => ((e.currentTarget.style.backgroundColor = "#007bff"))}
          >
            Ver más ventas
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesTable;
