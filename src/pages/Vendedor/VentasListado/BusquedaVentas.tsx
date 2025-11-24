import { useState } from "react";
import type { Venta } from "../../../types/Venta";

interface Props {
  ventas: Venta[];
  onFiltrarVentas: (ventas: Venta[]) => void;
}

const BusquedaVentas = ({ ventas, onFiltrarVentas }: Props) => {
  const [filtros, setFiltros] = useState({
    nroBoleta: "",
    tipoPago: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    const ventasFiltradas = ventas.filter((venta) => {
      // Filtrar por número de boleta
      const coincideNro =
        !filtros.nroBoleta || venta.nro.includes(filtros.nroBoleta);

      // Filtrar por tipo de pago
      const coincideTipoPago =
        !filtros.tipoPago || venta.tipoPago === filtros.tipoPago;

      // Convertir fecha "YYYY-MM-DD HH:mm" → "YYYY-MM-DD"
      const ventaFechaISO = venta.fecha ? venta.fecha.split(" ")[0] : "";

      const coincideFechaInicio =
        !filtros.fechaInicio || ventaFechaISO >= filtros.fechaInicio;

      const coincideFechaFin =
        !filtros.fechaFin || ventaFechaISO <= filtros.fechaFin;

      return (
        coincideNro &&
        coincideTipoPago &&
        coincideFechaInicio &&
        coincideFechaFin
      );
    });

    onFiltrarVentas(ventasFiltradas);
  };

  return (
    <div className="barra-busqueda">
      <label>
        Nro boleta:
        <input
          type="text"
          name="nroBoleta"
          placeholder="Número de boleta"
          value={filtros.nroBoleta}
          onChange={handleChange}
        />
      </label>

      <label>
        Tipo de pago:
        <select name="tipoPago" value={filtros.tipoPago} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="Yape">Yape</option>
          <option value="Plin">Plin</option>
          <option value="Mixto">Mixto</option>
          <option value="Efectivo">Efectivo</option>
        </select>
      </label>

      <label>
        Fecha:
        <input
          type="date"
          name="fechaInicio"
          value={filtros.fechaInicio}
          onChange={handleChange}
        />
        <span> - </span>
        <input
          type="date"
          name="fechaFin"
          value={filtros.fechaFin}
          onChange={handleChange}
        />
      </label>

      <button className="boton-buscar-vendedor" onClick={handleBuscar}>
        Buscar
      </button>
    </div>
  );
};

export default BusquedaVentas;
