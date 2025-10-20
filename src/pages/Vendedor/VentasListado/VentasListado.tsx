import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaVentas from "./BusquedaVentas";
import Paginacion from "../../../components/Paginacion/Paginacion";
import "../../../Styles/PaginasListado.css";

interface Venta {
  nro: string;
  tipoPago: string;
  fecha: string;
  cliente: string;
  total: string;
}

const columnasVentas = [
  { key: "nro", label: "NRO.", sortable: true },
  { key: "tipoPago", label: "Tipo de Pago", sortable: true },
  { key: "fecha", label: "Fecha / Hora", sortable: true },
  { key: "cliente", label: "Cliente", sortable: true },
  { key: "total", label: "Total", sortable: true },
];

const datosVentasIniciales: Venta[] = Array.from(
  { length: 25 },
  (_, index) => ({
    nro: String(index + 1).padStart(3, "0"),
    tipoPago: ["Yape", "Plin", "Mixto"][index % 3],
    fecha: "2025-09-17",
    cliente: ["Pepito", "Luis Perez", "Camila Diaz", "Andre"][index % 4],
    total: `s/${(Math.random() * 100 + 10).toFixed(2)}`,
  })
);

const VentasListado = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [ventasFiltradas, setVentasFiltradas] =
    useState<Venta[]>(datosVentasIniciales);
  const filasPorPagina = 10;
  const navigate = useNavigate();

  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const ventasPaginadas = ventasFiltradas.slice(inicio, fin);
  const totalPaginas = Math.ceil(ventasFiltradas.length / filasPorPagina);

  const renderOpciones = (fila: Venta) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <i
        className="bi bi-file-earmark-text icono-opcion"
        title="Ver"
        onClick={() => navigate(`/vendedor/listado/${fila.nro}`)}
        style={{ cursor: "pointer", fontSize: "20px" }}
      ></i>
      <i
        className="bi bi-download icono-opcion"
        title="Descargar PDF"
        onClick={() => console.log("Descargar PDF de venta:", fila)}
        style={{ cursor: "pointer", fontSize: "20px" }}
      ></i>
    </div>
  );

  const actualizarVentasFiltradas = (ventas: Venta[]) => {
    setVentasFiltradas(ventas);
    setPaginaActual(1);
  };

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaVentas
        ventas={datosVentasIniciales}
        onFiltrarVentas={actualizarVentasFiltradas}
      />

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
