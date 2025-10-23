import { useState } from "react";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaCierres from "./BusquedaCierresCaja";
import Paginacion from "../../../components/Paginacion/Paginacion";
import '../../../Styles/PaginasListado.css';

const columnasCierres = [
  { key: "id", label: "#" },
  { key: "vendedor", label: "Vendedor" },
  { key: "mes", label: "Mes" },
  { key: "total", label: "Total" },
  { key: "cantidad", label: "Cantidad" },
  { key: "fecha", label: "Fecha" },
  { key: "descargar", label: "Descargar" },
];

const datosCierres = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  vendedor: `Vendedor ${i + 1}`,
  mes: ["Enero", "Febrero", "Marzo"][i % 3],
  total: (Math.random() * 1000).toFixed(2),
  cantidad: Math.floor(Math.random() * 50 + 1),
  fecha: new Date(2025, i % 12, i + 1).toLocaleDateString(),
  descargar: "boton", // Solo un placeholder, lo convertimos en botón abajo
}));

const CierresCajaAdmin = () => {
  const [cierres, setCierres] = useState(datosCierres);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 7;

  const buscarCierres = (filtros: any) => {
    const filtrados = datosCierres.filter(cierre => {
      const coincideVendedor = filtros.vendedor === "" || cierre.vendedor.toLowerCase().includes(filtros.vendedor.toLowerCase());
      const coincideMes = filtros.mes === "" || cierre.mes === filtros.mes;
      return coincideVendedor && coincideMes;
    });
    setCierres(filtrados);
    setPaginaActual(1);
  };

  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const cierresPaginados = cierres.slice(inicio, fin);
  const totalPaginas = Math.ceil(cierres.length / filasPorPagina);

  const renderOpciones = (fila: any) => (
    <button
      onClick={() => console.log("Descargando cierre:", fila)}
      style={{
        backgroundColor: "#2c2e86",
        color: "#fff",
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Descargar
    </button>
  );

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaCierres onBuscar={buscarCierres} />

      <TablaGenerica
        columnas={columnasCierres}
        datos={cierresPaginados}
        renderOpciones={renderOpciones}
      />

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}
        tipo="admin"
      />
    </div>
  );
};

export default CierresCajaAdmin;
