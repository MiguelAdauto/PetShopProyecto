import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "../../../components/Dashboard/Card";
import TotalCajaCard from "../../../components/Dashboard/TotalCajaCard";
import LineChart from "../../../components/Dashboard/LineChart";
import PieChart from "../../../components/Dashboard/PieChart";
import SalesTable from "../../../components/Dashboard/SalesTable";
import CustomDatePicker from "../../../components/Dashboard/CustomDatePicker";

import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [fecha, setFecha] = useState<Date | null>(new Date());
  const [totalVentasDia, setTotalVentasDia] = useState<number>(0);
  const [totalProductosDia, setTotalProductosDia] = useState<number>(0);
  const [ventasDashboard, setVentasDashboard] = useState<any[]>([]);

  // Datos para gráficos (por ahora estáticos)
  const lineCategories = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const lineSeries = [{ name: "Monto de Ventas", data: [10, 30, 50, 70, 90, 110] }];
  const pieLabels = ["Alimentos", "Juguetes", "Medicinas", "Accesorios", "Ropa"];
  const pieSeries = [44, 25, 15, 10, 6];

  // Formatear fecha a yyyy-mm-dd para el backend
  const formatFecha = (date: Date | null) => date?.toISOString().split("T")[0] ?? "";

  // ---------------------
  // Traer totales por día
  // ---------------------
  useEffect(() => {
    if (!fecha) return;

    const fetchTotalVentas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard/ventas/total-dia", {
          params: { fecha: formatFecha(fecha) },
        });
        setTotalVentasDia(response.data.status === "ok" ? response.data.total : 0);
      } catch (err) {
        console.error("Error al obtener total de ventas:", err);
        setTotalVentasDia(0);
      }
    };

    const fetchTotalProductos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard/ventas/productos-dia", {
          params: { fecha: formatFecha(fecha) },
        });
        setTotalProductosDia(response.data.status === "ok" ? response.data.total : 0);
      } catch (err) {
        console.error("Error al obtener productos vendidos:", err);
        setTotalProductosDia(0);
      }
    };

    fetchTotalVentas();
    fetchTotalProductos();
  }, [fecha]);

  // ---------------------
  // Traer últimas ventas para el dashboard
  // ---------------------
  useEffect(() => {
    const fetchVentasDashboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/ventas/listar-detalle-dashboard",
          { params: { limit: 5 } }
        );

        if (response.data.status === "ok") {
          const transformed = response.data.ventas.map((v: any) => ({
            fecha: v.fecha,
            producto: v.producto || "-",
            sub: v.subcategoria || "-",
            total: v.total,
            estado: v.vendedor || "-", // ahora muestra el nombre del vendedor
          }));
          setVentasDashboard(transformed);
        } else {
          setVentasDashboard([]);
        }
      } catch (err) {
        console.error("Error al obtener ventas dashboard:", err);
        setVentasDashboard([]);
      }
    };

    fetchVentasDashboard();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-scroll">
        {/* --- TARJETAS --- */}
        <div className="admin-cards-row">
          <Card
            title="Total de Ventas del Día"
            value={`S/ ${totalVentasDia.toFixed(2)}`}
            icon="bi-bar-chart-fill"
            rightContent={
              <CustomDatePicker
                selected={fecha ?? undefined}
                onChange={(date) => setFecha(date)}
              />
            }
          />

          <Card
            title="Productos Vendidos por día"
            value={totalProductosDia.toString()}
            icon="bi-cart-check-fill"
            rightContent={
              <CustomDatePicker
                selected={fecha ?? undefined}
                onChange={(date) => setFecha(date)}
              />
            }
          />

          <TotalCajaCard
            montoInicial={8950}
            onAbrirCaja={(monto) => console.log("Caja abierta con:", monto)}
            onCerrarCaja={() => console.log("Caja cerrada")}
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
          <SalesTable data={ventasDashboard} limit={5} title="Últimas Ventas" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
