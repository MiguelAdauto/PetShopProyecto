import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

interface FiltrosProductos {
  codigo: string;
  nombre: string;
  categoria: string; // Mixto, Gato, Perro
  subcategoria: string; // desde API
}

interface Props {
  onBuscar: (filtros: FiltrosProductos) => void;
}

const BusquedaProductos = ({ onBuscar }: Props) => {
  const [filtros, setFiltros] = useState<FiltrosProductos>({
    codigo: "",
    nombre: "",
    categoria: "",
    subcategoria: "",
  });

  const [subcategorias, setSubcategorias] = useState<{ id: number; nombre: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarSubcategorias = async () => {
      try {
        const response = await api.get("/subcategorias/visibles");
        if (response.data.status === "ok") {
          setSubcategorias(response.data.subcategorias);
        }
      } catch (error) {
        console.error("Error al cargar subcategorías", error);
      }
    };
    cargarSubcategorias();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    onBuscar(filtros);
  };

  const handleBotonAdmin = () => {
    navigate("/admin/agregar-producto");
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
        <select name="categoria" value={filtros.categoria} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="Mixto">Mixto</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
      </label>

      <label>
        Subcategoría:
        <select name="subcategoria" value={filtros.subcategoria} onChange={handleChange}>
          <option value="">Todas</option>
          {subcategorias.map((s) => (
            <option key={s.id} value={s.nombre}>
              {s.nombre}
            </option>
          ))}
        </select>
      </label>

      <button className="boton-buscar-admin" onClick={handleBuscar}>
        Buscar
      </button>
      <button className="boton-agregar-admin" onClick={handleBotonAdmin}>
        Agregar
      </button>
    </div>
  );
};

export default BusquedaProductos;
