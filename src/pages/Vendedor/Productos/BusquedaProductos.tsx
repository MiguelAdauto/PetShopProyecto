import { useState } from "react";

interface FiltrosProductos {
  codigo: string;
  nombre: string;
  tipo: string;
  categoria: string;
}

interface Props {
  onBuscar: (filtros: FiltrosProductos) => void;
}

const BusquedaProductos = ({ onBuscar }: Props) => {
  const [filtros, setFiltros] = useState<FiltrosProductos>({
    codigo: "",
    nombre: "",
    tipo: "",
    categoria: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    onBuscar(filtros);
  };

  return (
    <div className="barra-busqueda">
      <label>
        Código:
        <input
          type="text"
          name="codigo"
          placeholder="Ingresar el código"
          value={filtros.codigo}
          onChange={handleChange}
        />
      </label>

      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={filtros.nombre}
          onChange={handleChange}
        />
      </label>

      <label>
        Tipo:
        <select name="tipo" value={filtros.tipo} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="Mixto">Mixto</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
      </label>

      <label>
        Categoría:
        <select name="categoria" value={filtros.categoria} onChange={handleChange}>
          <option value="">Todas</option>
          <option value="Juguetes">Juguetes</option>
          <option value="Aseo">Aseo</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Hogar">Hogar</option>
          <option value="Comederos">Comederos</option>
        </select>
      </label>

      <button className="boton-buscar-vendedor" onClick={handleBuscar}>
        Buscar
      </button>
    </div>
  );
};

export default BusquedaProductos;