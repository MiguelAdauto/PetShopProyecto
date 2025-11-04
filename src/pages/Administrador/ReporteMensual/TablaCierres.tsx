import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaCierres from "./BusquedaCierresCaja";
import Paginacion from "../../../components/Paginacion/Paginacion";
import "../../../Styles/PaginasListado.css";

interface Cierre {
  id: number;
  mes: string;
  anio: string;
  total: string;
  cantidad: number;
  fecha: string;
  archivo: string;
  vendedor: string;
}

// ✅ Columnas de la tabla
const columnasCierres = [
  { key: "id", label: "#", sortable: true },
  { key: "vendedor", label: "Vendedor", sortable: true },
  { key: "mes", label: "Mes", sortable: true },
  { key: "anio", label: "Año", sortable: true },
  { key: "total", label: "Total Ventas", sortable: true },
  { key: "cantidad", label: "Cantidad Ventas", sortable: true },
  { key: "fecha", label: "Fecha Generación", sortable: true },
  { key: "archivo", label: "Archivo", sortable: false },
];

// ✅ Datos simulados
const datosCierresEstaticos: Cierre[] = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  vendedor: ["Luis", "Camila", "Andrés", "Sofía"][index % 4],
  mes: [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ][index % 12],
  anio: "2025",
  total: `S/${(Math.random() * 5000 + 1000).toFixed(2)}`,
  cantidad: Math.floor(Math.random() * 40 + 10),
  fecha: "2025-10-25",
  archivo: `cierre_${index + 1}.pdf`,
}));

const CierresListado = () => {
  const [cierres, setCierres] = useState<Cierre[]>(datosCierresEstaticos);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setCierres(datosCierresEstaticos), 1000);
  }, []);

  //  Filtro desde el buscador
  const buscarCierres = (filtros: { vendedor: string; mes: string }) => {
    const filtrados = datosCierresEstaticos.filter((cierre) => {
      const coincideVendedor =
        filtros.vendedor === "" ||
        cierre.vendedor.toLowerCase().includes(filtros.vendedor.toLowerCase());
      const coincideMes = filtros.mes === "" || cierre.mes === filtros.mes;
      return coincideVendedor && coincideMes;
    });
    setCierres(filtrados);
    setPaginaActual(1);
  };

  // Paginación
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const cierresPaginados = cierres.slice(inicio, fin);
  const totalPaginas = Math.ceil(cierres.length / filasPorPagina);

  //Opciones de cada fila
  const renderOpciones = (fila: Cierre) => (
    <div style={{ display: "flex", gap: "12px" }}>
      <button onClick={() => navigate(`/admin/detalle-cierre/${fila.id}`)}>Ver Detalle</button>
      <button
        title="Descargar PDF"
        onClick={() => console.log("Descargar PDF:", fila)}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-download" style={{ fontSize: "18px", color: "#000" }}></i>
      </button>
    </div>
  );

  //Render personalizado de celdas (opcional, por si quieres agregar iconos)
  const renderCustomCell = (key: string, value: any) => {
    if (key === "archivo") {
      return <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>{value}</span>;
    }
    return value;
  };

  return (
    <div className="contenedor-pagina-listado">

      <BusquedaCierres onBuscar={buscarCierres} />

      <TablaGenerica
        columnas={columnasCierres}
        datos={cierresPaginados}
        renderOpciones={renderOpciones}
        renderCell={renderCustomCell}
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

export default CierresListado;
