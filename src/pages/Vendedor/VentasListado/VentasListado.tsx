import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaVentas from "./BusquedaVentas";
import Paginacion from "../../../components/Paginacion/Paginacion";
import "../../../Styles/PaginasListado.css";
import api from "../../../api/api";
import type { Venta } from "../../../types/Venta";

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

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        const res = await api.get("/ventas/listar");

        if (res.data.status !== "ok") {
          console.error("Error al cargar ventas:", res.data);
          return;
        }

        const ventasBD = res.data.ventas.map((v: any) => ({
          id: v.id,
          nro: v.nro,
          tipoPago: v.tipoPago,
          fecha: v.fecha,
          cliente: v.cliente,
          total: v.total,
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

  const inicio = (paginaActual - 1) * filasPorPagina;
  const ventasPaginadas = ventasFiltradas.slice(inicio, inicio + filasPorPagina);
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
        className="bi bi-eye"
        title="Ver Boleta"
        style={{ cursor: "pointer", fontSize: "20px" }}
        onClick={() =>
          window.open(`http://localhost:5000/boleta/${fila.id}`, "_blank")
        }
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
