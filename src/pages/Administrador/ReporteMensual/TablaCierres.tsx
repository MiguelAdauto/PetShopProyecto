import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaCierres from "./BusquedaCierresCaja";
import Paginacion from "../../../components/Paginacion/Paginacion";
import "../../../Styles/PaginasListado.css";
import axios from "axios";

interface Cierre {
  id: number;
  mes: string;
  anio: string;
  total: string;
  cantidad: number;
  fecha: string;
  vendedor: string;
}

const columnasCierres = [
  { key: "id", label: "#", sortable: true },
  { key: "vendedor", label: "Vendedor", sortable: true },
  { key: "mes", label: "Mes", sortable: true },
  { key: "anio", label: "Año", sortable: true },
  { key: "total", label: "Total Ventas", sortable: true },
  { key: "cantidad", label: "Cantidad Ventas", sortable: true },
  { key: "fecha", label: "Fecha Generación", sortable: true },
];

const CierresListado = () => {
  const [cierres, setCierres] = useState<Cierre[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 6;
  const navigate = useNavigate();

  // 🔹 Traer cierres del backend
  useEffect(() => {
    const cargarCierres = async () => {
      try {
        const res = await axios.get("http://localhost:5000/cierres/listar");

        if (res.data.status === "ok") {
          const transformados = res.data.cierres.map((c: any) => ({
            id: c.id,
            mes: obtenerNombreMes(c.mes),
            anio: c.anio.toString(),
            total: `S/${Number(c.total_ventas).toFixed(2)}`,
            cantidad: c.cantidad_ventas,
            fecha: c.fecha_generacion,
            vendedor: c.vendedor_nombre
            ? `${c.vendedor_nombre} ${c.vendedor_apellido}`
            : "—",
          }));

          setCierres(transformados);
        }
      } catch (error) {
        console.error("Error cargando cierres:", error);
      }
    };

    cargarCierres();
  }, []);

  // Convertir número a nombre del mes
  const obtenerNombreMes = (mesNum: number) => {
    const nombres = [
      "Enero","Febrero","Marzo","Abril","Mayo","Junio",
      "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
    ];
    return nombres[mesNum - 1] || mesNum.toString();
  };

  // Filtro desde buscador
  const buscarCierres = (filtros: { vendedor: string; mes: string }) => {
    const filtrados = cierres.filter((cierre) => {
      const coincideVendedor =
        filtros.vendedor === "" ||
        cierre.vendedor.toLowerCase().includes(filtros.vendedor.toLowerCase());

      const coincideMes =
        filtros.mes === "" || cierre.mes === filtros.mes;

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

  const renderOpciones = (fila: Cierre) => (
    <div style={{ display: "flex", gap: "12px" }}>
      <button
        title="Ver Detalles"
        onClick={() => navigate(`/admin/detalle-cierre/${fila.id}`)}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-info-circle" style={{ fontSize: "18px", color: "#000" }}></i>
      </button>

      <button
        title="Descargar PDF"
        onClick={() => console.log("Descargar PDF:", fila)}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        <i className="bi bi-download" style={{ fontSize: "18px", color: "#000" }}></i>
      </button>
    </div>
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

export default CierresListado;
