import { useState } from "react";

interface FiltrosCierres {
  vendedor: string;
  mes: string;
}

interface Props {
  onBuscar: (filtros: FiltrosCierres) => void;
}

const BusquedaCierres = ({ onBuscar }: Props) => {
  const [filtros, setFiltros] = useState<FiltrosCierres>({
    vendedor: "",
    mes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    onBuscar(filtros);
  };

  return (
    <div className="barra-busqueda">
      <label>
        Vendedor:
        <input
          type="text"
          name="vendedor"
          value={filtros.vendedor}
          onChange={handleChange}
          placeholder="Nombre del vendedor"
        />
      </label>

      <label>
        Mes:
        <select name="mes" value={filtros.mes} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="Enero">Enero</option>
          <option value="Febrero">Febrero</option>
          <option value="Marzo">Marzo</option>
        </select>
      </label>

      <button className="boton-buscar-admin" onClick={handleBuscar}>Buscar</button>
    </div>
  );
};

export default BusquedaCierres;
