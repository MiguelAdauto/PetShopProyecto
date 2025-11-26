import { useEffect, useState } from "react";
import BusquedaCierres from "./BusquedaCierres";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import ModalGenerarCierre from "../../../components/Modal/ModalGenerarCierre";
import axios from "axios";

interface Cierre {
  id: number;
  mes: number;
  anio: number;
  total_ventas: number;
  cantidad_ventas: number;
  fecha_generacion: string;
  archivo_excel: string | null;
  vendedor_id: number;
}

const CierresMensuales = () => {
  const [cierres, setCierres] = useState<Cierre[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mesSeleccionado, setMesSeleccionado] = useState<number | null>(null);
  const [anioSeleccionado, setAnioSeleccionado] = useState<number | null>(null);

  const columnas = [
    { key: "id", label: "#" },
    { key: "mes", label: "Mes" },
    { key: "anio", label: "Año" },
    { key: "total_ventas", label: "Total Ventas s/" },
    { key: "cantidad_ventas", label: "Cantidad de Ventas" },
    { key: "fecha_generacion", label: "Fecha Generación" },
    { key: "archivo_excel", label: "Archivo" },
  ];

  // 🔹 Cargar cierres desde Flask
  useEffect(() => {
    const cargarCierres = async () => {
      try {
        const res = await axios.get("http://localhost:5000/cierres/listar");
        if (res.data.status === "ok") setCierres(res.data.cierres);
      } catch (err) {
        console.error("Error al cargar cierres:", err);
        alert("Error cargando cierres. Revisa la consola.");
      }
    };
    cargarCierres();
  }, []);

  // 🔹 Abrir modal para generar cierre
  const handleCerrarCaja = (mes: string, anio: string) => {
    const mesNum = Number(mes);
    const anioNum = Number(anio);

    if (!mes || !anio || isNaN(mesNum) || isNaN(anioNum))
      return alert("Selecciona mes y año válidos.");

    setMesSeleccionado(mesNum);
    setAnioSeleccionado(anioNum);
    setModalOpen(true);
  };

  // 🔹 Generar cierre
  const handleGenerarCierre = async () => {
    if (mesSeleccionado === null || anioSeleccionado === null) {
      return alert("Mes o año inválido");
    }

    try {
      const vendedor_id = 1; // reemplazar por el id real del usuario logueado
      console.log("Generando cierre con:", {
        mes: mesSeleccionado,
        anio: anioSeleccionado,
        vendedor_id,
      });

      const res = await axios.post("http://localhost:5000/cierres/generar", {
        mes: mesSeleccionado,
        anio: anioSeleccionado,
        vendedor_id,
      });

      if (res.data.status === "ok") {
        setCierres([...cierres, res.data.cierre]);
        setModalOpen(false);
        alert("Cierre generado correctamente");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (error) {
      console.error("Error generando cierre:", error);
      alert("Error al generar cierre. Revisa la consola.");
    }
  };

  // 🔹 Filtrar cierres
  const handleBuscar = (mes: string, anio: string) => {
    const mesNum = Number(mes);
    const anioNum = Number(anio);

    if (!mes || !anio || isNaN(mesNum) || isNaN(anioNum)) {
      setMesSeleccionado(null);
      setAnioSeleccionado(null);
      return;
    }

    setMesSeleccionado(mesNum);
    setAnioSeleccionado(anioNum);
  };

  const datosFiltrados =
    mesSeleccionado !== null && anioSeleccionado !== null
      ? cierres.filter(
          (c) => c.mes === mesSeleccionado && c.anio === anioSeleccionado
        )
      : cierres;

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaCierres onCerrarCaja={handleCerrarCaja} onBuscar={handleBuscar} />

      {datosFiltrados.length === 0 &&
      mesSeleccionado !== null &&
      anioSeleccionado !== null ? (
        <p>
          No existe cierre generado para {mesSeleccionado} {anioSeleccionado}
        </p>
      ) : (
        <TablaGenerica
          columnas={columnas}
          datos={datosFiltrados}
          renderOpciones={(fila: Cierre) => (
            <i
              className="bi bi-download icono-opcion"
              title="Descargar Excel"
              onClick={() =>
                alert(`Descargando archivo de ${fila.mes} ${fila.anio}`)
              }
              style={{ cursor: "pointer", fontSize: "20px" }}
            ></i>
          )}
        />
      )}

      {modalOpen && mesSeleccionado !== null && anioSeleccionado !== null && (
        <ModalGenerarCierre
          mes={mesSeleccionado.toString()}
          anio={anioSeleccionado.toString()}
          onClose={() => setModalOpen(false)}
          onGenerar={handleGenerarCierre}
        />
      )}
    </div>
  );
};

export default CierresMensuales;
