// src/pages/Vendedor/Ventas/BusquedaProductoV.tsx

import BarraBusqueda from "../../../components/BarraBusqueda/BarraBusqueda";

interface Props {
  onBuscar: (filtros: Record<string, string>) => void;
}

const BusquedaProductoV = ({ onBuscar }: Props) => {
  const filtros = [
    {
      label: "Nombre del producto",
      name: "nombre",
      type: "text" as const,
      placeholder: "Buscar por nombre",
    },
    {
      label: "Código",
      name: "codigo",
      type: "text" as const,
      placeholder: "Buscar por código",
    },
  ];

  return <BarraBusqueda filtros={filtros} onBuscar={onBuscar} />;
};

export default BusquedaProductoV;