import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FiltrosCategorias {
  nombre: string;
}

interface Props {
  onBuscar: (filtros: FiltrosCategorias) => void;
}

const BusquedaCategorias = ({ onBuscar }: Props) => {
  const [filtros, setFiltros] = useState<FiltrosCategorias>({
    nombre: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    onBuscar(filtros);
  };

  const handleBotonAdmin = () => {
    // Navegar a la página para agregar una nueva subcategoría
    navigate("/admin/agregar-subcategoria");
  };

  return (
    <div className="barra-busqueda">
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la categoría"
          value={filtros.nombre}
          onChange={handleChange}
        />
      </label>

      <button className="boton-buscar-admin" onClick={handleBuscar}>
        Buscar
      </button>

      <button className="boton-buscar-vendedor" onClick={handleBotonAdmin}>
        Agregar
      </button>
    </div>
  );
};

export default BusquedaCategorias;
