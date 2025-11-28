import React, { useState } from "react";

interface BusquedaProps {
  onCerrarCaja: (mes: string, anio: string) => void;
  onBuscar: (mes: string, anio: string, vendedor: string) => void;
}

const BusquedaCierres: React.FC<BusquedaProps> = ({ onCerrarCaja, onBuscar }) => {
  const [filtros, setFiltros] = useState({
    mes: "",
    anio: "",
    vendedor: ""
  });

  const mesesNombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Función para manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para manejar la búsqueda
  const handleBuscar = () => {
    const { mes, anio, vendedor } = filtros;
    onBuscar(mes, anio, vendedor);  // Pasamos los filtros de mes, año y vendedor
  };

  // Función para cerrar caja automáticamente con la fecha actual
  const handleCerrarCajaAutomatico = () => {
    const fecha = new Date();
    const mesActual = mesesNombres[fecha.getMonth()];  // Obtenemos el mes actual por nombre
    const anioActual = fecha.getFullYear().toString();  // Obtenemos el año actual
    onCerrarCaja(mesActual, anioActual);  // Llamamos a la función onCerrarCaja con el mes y año actuales
  };

  return (
    <div className="barra-busqueda">
      {/* Select para el mes */}
      <label>
        Mes:
        <select name="mes" value={filtros.mes} onChange={handleChange}>
          <option value="">Todos</option>
          {mesesNombres.map((mes) => (
            <option key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>
      </label>

      {/* Input para el año */}
      <label>
        Año: 
        <input
          type="number"
          name="anio"
          placeholder="Año"
          value={filtros.anio}
          onChange={handleChange}
        />
      </label>

      {/* Botón para realizar la búsqueda */}
      <button className="boton-buscar-vendedor" onClick={handleBuscar}>
        Buscar
      </button>
      {/* Botón que cierra caja automáticamente con la fecha actual */}
      <button className="boton-agregar-vendedor" onClick={handleCerrarCajaAutomatico}>
        Cerrar Caja
      </button>
    </div>
  );
};

export default BusquedaCierres;