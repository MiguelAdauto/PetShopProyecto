// src/pages/Administrador/Dashboard/AdminDashboard.tsx
import React from "react";
import Card from "../../../components/Dashboard/Card";
import LineChart from "../../../components/Dashboard/LineChart";
import PieChart from "../../../components/Dashboard/PieChart";
import SalesTable from "../../../components/Dashboard/SalesTable";
import "./AdminDashboard.css"; // ✅ agregamos un CSS propio

const AdminDashboard: React.FC = () => {
  // --- Datos de ejemplo ---
  const lineCategories = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const lineSeries = [
    { name: "Monto de Ventas", data: [10, 30, 50, 70, 90, 110] },
  ];

  const pieLabels = ["Alimentos", "Juguetes", "Medicinas", "Accesorios", "Ropa"];
  const pieSeries = [44, 25, 15, 10, 6];

  const historial = [
    { fecha: "31/10/2025", producto: "Collar luminoso", sub: "Accesorios", total: "$25.00", estado: "Completado" },
    { fecha: "30/10/2025", producto: "Comida Premium", sub: "Alimentos", total: "$120.00", estado: "Completado" },
    { fecha: "29/10/2025", producto: "Juguete mordedor", sub: "Juguetes", total: "$15.00", estado: "Pendiente" },
    { fecha: "28/10/2025", producto: "Ropa canina", sub: "Ropa", total: "$30.00", estado: "Completado" },
    { fecha: "27/10/2025", producto: "Galletas felinas", sub: "Alimentos", total: "$18.00", estado: "Completado" },
    { fecha: "26/10/2025", producto: "Shampoo Pet", sub: "Aseo", total: "$12.00", estado: "Pendiente" },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-scroll">
        {/* --- Tarjetas --- */}
        <div className="admin-cards-row">
          <Card title="Total de Ventas (Mes/Día)" value="s/12,340" />
          <Card title="Total en Caja del Mes" value="s/8,950" />
          <Card title="Productos Vendidos Hoy" value={12} />
        </div>

        {/* --- Gráficos --- */}
        <div className="admin-charts-row">
          <div className="admin-chart-item">
            <h2>Ventas Generales</h2>
            <LineChart categories={lineCategories} series={lineSeries} />
          </div>
          <div className="admin-chart-item small">
            <h2>Top 5 Subcategorías Vendidas</h2>
            <PieChart labels={pieLabels} series={pieSeries} />
          </div>
        </div>

        {/* --- Tabla --- */}
        <div className="admin-table-container">
          <h2>Historial de Ventas</h2>
          <SalesTable data={historial} limit={3} />
        </div>  
      </div>
    </div>
  );
};

export default AdminDashboard;
