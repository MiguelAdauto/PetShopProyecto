import { useState } from "react";

interface Venta {
  nro: string;
  tipoPago: string;
  fecha: string;
  cliente: string;
  total: string;
}

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
      const coincideNro = !filtros.nroBoleta || venta.nro.includes(filtros.nroBoleta);
      const coincideTipoPago = !filtros.tipoPago || venta.tipoPago === filtros.tipoPago;
      const coincideFechaInicio = !filtros.fechaInicio || venta.fecha >= filtros.fechaInicio;
      const coincideFechaFin = !filtros.fechaFin || venta.fecha <= filtros.fechaFin;

      return coincideNro && coincideTipoPago && coincideFechaInicio && coincideFechaFin;
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