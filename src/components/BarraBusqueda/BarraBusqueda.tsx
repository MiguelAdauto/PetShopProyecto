// src/components/BarraBusqueda/BarraBusqueda.tsx
import { useState } from "react";

type Filtro = {
  label: string;
  name: string;
  type: "text" | "select" | "date";
  options?: string[]; // Solo si type === "select"
  placeholder?: string;
};

interface Props {
  filtros: Filtro[];
  onBuscar: (valores: Record<string, string>) => void;
}

const BarraBusqueda = ({ filtros, onBuscar }: Props) => {
  const [valores, setValores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    onBuscar(valores);
  };

  return (
    <div className="barra-busqueda">
      {filtros.map((filtro) => (
        <label key={filtro.name}>
          {filtro.label}:
          {filtro.type === "select" ? (
            <select
              name={filtro.name}
              value={valores[filtro.name] || ""}
              onChange={handleChange}
            >
              <option value="">Todos</option>
              {filtro.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={filtro.type}
              name={filtro.name}
              placeholder={filtro.placeholder}
              value={valores[filtro.name] || ""}
              onChange={handleChange}
            />
          )}
        </label>
      ))}

      <button className="boton-buscar" onClick={handleBuscar}>
        Buscar
      </button>
    </div>
  );
};

export default BarraBusqueda;