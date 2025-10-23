import React, { useState } from "react";
import "./CierresMensuales.css";

interface BusquedaProps {
  onCerrarCaja: (mes: string, anio: string) => void;
  onBuscar: (mes: string, anio: string) => void;
}

const BusquedaCierres: React.FC<BusquedaProps> = ({ onCerrarCaja, onBuscar }) => {
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");

  return (
    <div className="busqueda-cierres">
      <select value={mes} onChange={(e) => setMes(e.target.value)}>
        <option value="">Mes</option>
        <option value="Enero">Enero</option>
        <option value="Febrero">Febrero</option>
        <option value="Marzo">Marzo</option>
        <option value="Abril">Abril</option>
        <option value="Mayo">Mayo</option>
        <option value="Junio">Junio</option>
        <option value="Julio">Julio</option>
        <option value="Agosto">Agosto</option>
        <option value="Septiembre">Septiembre</option>
        <option value="Octubre">Octubre</option>
        <option value="Noviembre">Noviembre</option>
        <option value="Diciembre">Diciembre</option>
      </select>

      <input 
        type="number" 
        placeholder="Año" 
        value={anio} 
        onChange={(e) => setAnio(e.target.value)}
      />

      <button onClick={() => onCerrarCaja(mes, anio)}>Cerrar Caja</button>
      <button onClick={() => onBuscar(mes, anio)}>Buscar</button>
    </div>
  );
};

export default BusquedaCierres;
