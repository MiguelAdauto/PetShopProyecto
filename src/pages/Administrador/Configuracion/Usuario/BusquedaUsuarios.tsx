import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FiltrosUsuarios {
  nombre: string;
  dni: string;
  tipo: string;
}

interface Props {
  onBuscar: (filtros: FiltrosUsuarios) => void;
}

const BusquedaUsuarios = ({ onBuscar }: Props) => {
  const [filtros, setFiltros] = useState<FiltrosUsuarios>({
    nombre: "",
    dni: "",
    tipo: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    onBuscar(filtros);
  };

  const handleAgregarUsuario = () => {
    navigate("/admin/agregar-usuario");
  };

  return (
    <div className="barra-busqueda">
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          placeholder="Buscar por nombre"
          value={filtros.nombre}
          onChange={handleChange}
        />
      </label>

      <label>
        DNI:
        <input
          type="text"
          name="dni"
          placeholder="Buscar por DNI"
          value={filtros.dni}
          onChange={handleChange}
        />
      </label>

      <label>
        Rol:
        <select name="tipo" value={filtros.tipo} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="vendedor">Vendedor</option>
          <option value="admin">Administrador</option>
        </select>
      </label>

      <button className="boton-buscar-admin" onClick={handleBuscar}>
        Buscar
      </button>
      <button className="boton-buscar-vendedor" onClick={handleAgregarUsuario}>
        Agregar Usuario
      </button>
    </div>
  );
};

export default BusquedaUsuarios;
