import React, { useState } from "react";
import BusquedaCierres from "./BusquedaCierres";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import ModalGenerarCierre from "../../../components/Modal/ModalGenerarCierre";
import "./CierresMensuales.css";

interface Cierre {
  id: number;
  mes: string;
  anio: string;
  totalVentas: number;
  cantidadVentas: number;
  fechaGeneracion: string;
  archivo: string;
}

const CierresMensuales = () => {
  const [cierres, setCierres] = useState<Cierre[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [anioSeleccionado, setAnioSeleccionado] = useState("");

  const columnas = [
    { key: "id", label: "#" },
    { key: "mes", label: "Mes" },
    { key: "anio", label: "Año" },
    { key: "totalVentas", label: "Total Ventas" },
    { key: "cantidadVentas", label: "Cantidad de Ventas" },
    { key: "fechaGeneracion", label: "Fecha Generación" },
    { key: "archivo", label: "Archivo" },
    { key: "accion", label: "Acción" },
  ];

  const handleCerrarCaja = (mes: string, anio: string) => {
    if (!mes || !anio) {
      alert("Selecciona mes y año.");
      return;
    }
    setMesSeleccionado(mes);
    setAnioSeleccionado(anio);
    setModalOpen(true);
  };

  const handleGenerarCierre = () => {
    const nuevoCierre: Cierre = {
      id: cierres.length + 1,
      mes: mesSeleccionado,
      anio: anioSeleccionado,
      totalVentas: Math.floor(Math.random() * 5000),
      cantidadVentas: Math.floor(Math.random() * 50 + 1),
      fechaGeneracion: new Date().toISOString().slice(0, 16).replace("T"," "),
      archivo: "Disponible",
    };
    setCierres([...cierres, nuevoCierre]);
    setModalOpen(false);
  };

  const handleBuscar = (mes: string, anio: string) => {
    setMesSeleccionado(mes);
    setAnioSeleccionado(anio);
  };

  const datosFiltrados = mesSeleccionado && anioSeleccionado
    ? cierres.filter(c => c.mes === mesSeleccionado && c.anio === anioSeleccionado)
    : cierres;

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaCierres onCerrarCaja={handleCerrarCaja} onBuscar={handleBuscar} />

      {datosFiltrados.length === 0 && mesSeleccionado && anioSeleccionado ? (
        <p>No existe cierre generado para {mesSeleccionado} {anioSeleccionado}</p>
      ) : (
        <TablaGenerica 
          columnas={columnas} 
          datos={datosFiltrados} 
          renderOpciones={(fila) => (
            <button onClick={() => alert(`Descargando archivo de ${fila.mes} ${fila.anio}`)}>Descargar</button>
          )} 
        />
      )}

      {modalOpen && (
        <ModalGenerarCierre
          mes={mesSeleccionado}
          anio={anioSeleccionado}
          onClose={() => setModalOpen(false)}
          onGenerar={handleGenerarCierre}
        />
      )}
    </div>
  );
};

export default CierresMensuales;
