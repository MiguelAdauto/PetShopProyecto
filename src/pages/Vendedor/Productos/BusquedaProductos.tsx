import { useState } from "react";

const BusquedaProductos = ({ onBuscar }: { onBuscar: (filtros: any) => void }) => {
  const [filtros, setFiltros] = useState({
    codigo: "",
    nombre: "",
    tipo: "Mixto",
    categoria: "Juguete",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    console.log("Buscar con filtros:", filtros);
    onBuscar(filtros); // Enviamos los filtros al padre
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
          <option value="Juguete">Juguete</option>
          <option value="Aseo">Aseo</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Hogar">Hogar</option>
          <option value="Comedores">Comedores</option>
        </select>
      </label>
      <button className="boton-buscar" onClick={handleBuscar}>
        Buscar
      </button>
    </div>
  );
};

export default BusquedaProductos;