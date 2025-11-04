import React, { useState } from "react";
import Card from "../../../components/Dashboard/Card";
import TotalCajaCard from "../../../components/Dashboard/TotalCajaCard";
import LineChart from "../../../components/Dashboard/LineChart";
import PieChart from "../../../components/Dashboard/PieChart";
import SalesTable from "../../../components/Dashboard/SalesTable";

import CustomDatePicker from "../../../components/Dashboard/CustomDatePicker";

import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<Date | null>(new Date());
  const [fechaFin, setFechaFin] = useState<Date | null>(new Date());

  const lineCategories = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const lineSeries = [
    { name: "Monto de Ventas", data: [10, 30, 50, 70, 90, 110] },
  ];
  const pieLabels = [
    "Alimentos",
    "Juguetes",
    "Medicinas",
    "Accesorios",
    "Ropa",
  ];
  const pieSeries = [44, 25, 15, 10, 6];

  const historial = [
    {
      fecha: "31/10/2025",
      producto: "Collar luminoso",
      sub: "Accesorios",
      total: "S/25.00",
      estado: "Completado",
    },
    {
      fecha: "30/10/2025",
      producto: "Comida Premium",
      sub: "Alimentos",
      total: "S/120.00",
      estado: "Completado",
    },
    {
      fecha: "29/10/2025",
      producto: "Juguete mordedor",
      sub: "Juguetes",
      total: "S/15.00",
      estado: "Pendiente",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-scroll">
        {/* --- TARJETAS --- */}
        <div className="admin-cards-row">
          {/* TOTAL DE VENTAS */}
          <Card
            title="Total de Ventas del dia"
            value="S/ 12,340"
            icon="bi-bar-chart-fill"
            rightContent={
              <div className="dashboard-card-actions">
                <CustomDatePicker
                  selected={fechaInicio ?? undefined}
                  onChange={(date) => setFechaInicio(date)}
                />
              </div>
            }
          />

          {/* --- TOTAL EN CAJA DEL MES --- */}
          <TotalCajaCard
            montoInicial={8950}
            onAbrirCaja={(monto) => console.log("Caja abierta con:", monto)}
            onCerrarCaja={() => console.log("Caja cerrada")}
          />

          {/* PRODUCTOS VENDIDOS HOY */}
          <Card
            title="Productos Vendidos por dia"
            value="12"
            icon="bi-cart-check-fill"
            rightContent={
              <div className="dashboard-card-actions">
                <CustomDatePicker
                  selected={fechaInicio ?? undefined}
                  onChange={(date) => setFechaInicio(date)}
                />
              </div>
            }
          />
        </div>

        {/* --- GRÁFICOS --- */}
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

        {/* --- TABLA --- */}
        <div className="admin-table-container">
          <h2>Historial de Ventas</h2>
          <SalesTable data={historial} limit={3} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
