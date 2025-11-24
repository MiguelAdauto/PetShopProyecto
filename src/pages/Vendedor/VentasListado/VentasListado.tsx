import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaVentas from "./BusquedaVentas";
import Paginacion from "../../../components/Paginacion/Paginacion";
import "../../../Styles/PaginasListado.css";
import api from "../../../api/api";
import type { Venta } from "../../../types/Venta";

// Columnas basadas en tu BASE DE DATOS real
const columnasVentas = [
  { key: "nro", label: "NRO.", sortable: true },
  { key: "tipoPago", label: "Tipo de Pago", sortable: true },
  { key: "fecha", label: "Fecha / Hora", sortable: true },
  { key: "cliente", label: "Cliente", sortable: true },
  { key: "total", label: "Total", sortable: true },
];


const VentasListado = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [ventasFiltradas, setVentasFiltradas] = useState<Venta[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 10;
  const navigate = useNavigate();

  // Cargar ventas desde Flask
  useEffect(() => {
    const cargarVentas = async () => {
      try {
        const res = await api.get("/ventas/listar");

        // Validación para evitar campos undefined
        const ventasBD = res.data.map((v: any) => ({
          id: v.id,
          fecha: v.fecha || "",
          nro: v.nro || "",
          tipoPago: v.tipoPago || "",
          cliente: v.cliente || "",
          total: v.total ?? 0,
        }));

        setVentas(ventasBD);
        setVentasFiltradas(ventasBD);
      } catch (error) {
        console.error("Error cargando ventas:", error);
        setVentas([]);
        setVentasFiltradas([]);
      }
    };

    cargarVentas();
  }, []);

  // Paginación
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const ventasPaginadas = ventasFiltradas.slice(inicio, fin);
  const totalPaginas = Math.ceil(ventasFiltradas.length / filasPorPagina);

  const renderOpciones = (fila: Venta) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <i
        className="bi bi-file-earmark-text icono-opcion"
        title="Ver"
        onClick={() => navigate(`/vendedor/listado/${fila.id}`)}
        style={{ cursor: "pointer", fontSize: "20px" }}
      />
      <i
        className="bi bi-download icono-opcion"
        title="Descargar PDF"
        onClick={() =>
          window.open(`http://localhost:5000/ventas/pdf/${fila.id}`, "_blank")
        }
        style={{ cursor: "pointer", fontSize: "20px" }}
      />
    </div>
  );

  const actualizarVentasFiltradas = (ventas: Venta[]) => {
    setVentasFiltradas(ventas);
    setPaginaActual(1);
  };

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaVentas ventas={ventas} onFiltrarVentas={actualizarVentasFiltradas} />

      <TablaGenerica
        columnas={columnasVentas}
        datos={ventasPaginadas}
        renderOpciones={renderOpciones}
      />

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}
        tipo="vendedor"
      />
    </div>
  );
};

export default VentasListado;
