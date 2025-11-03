import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaCategorias from "./BusquedaSubCategorias";
import Paginacion from "../../../components/Paginacion/Paginacion";
import '../../../Styles/PaginasListado.css';

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

const columnasCategorias = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'nombre', label: 'Nombre', sortable: true },
  { key: 'descripcion', label: 'Descripcion', sortable: true }
];

const datosCategoriasEstaticos: Categoria[] = [
  { id: 1, nombre: 'Juguetes', descripcion: 'Ubicado en la parte derecha de la pared' },
  { id: 2, nombre: 'Hogar', descripcion: 'Ubicados en la parte delantera del local' },
  { id: 3, nombre: 'Higiene', descripcion: 'Ubicado en el segundo nivel del estante delantero' },
];

const CategoriasListado = () => {
  const [categorias, setCategorias] = useState<Categoria[]>(datosCategoriasEstaticos);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState<Categoria[]>(datosCategoriasEstaticos);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setCategorias(datosCategoriasEstaticos), 2000);
  }, []);

  // ✅ Filtrar desde buscador
  const handleBuscar = (filtros: { nombre: string }) => {
    const filtrados = categorias.filter(cat =>
      filtros.nombre === "" || cat.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
    );
    setCategoriasFiltradas(filtrados);
    setPaginaActual(1);
  };

  // ✅ Paginación
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const categoriasPaginadas = categoriasFiltradas.slice(inicio, fin);
  const totalPaginas = Math.ceil(categoriasFiltradas.length / filasPorPagina);

  // ✅ Opciones de fila
  const renderOpcionesCategoria = (fila: Categoria) => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        title="Editar Categoría"
        onClick={() => navigate(`/admin/editar-subcategoria/${fila.id}`, { state: fila })}
        style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
        <i className="bi bi-pencil-square" style={{ fontSize: '18px', color: '#000000ff' }}></i>
      </button>
      <button
        title="Borrar Categoría"
        onClick={() => console.log('Borrar categoría:', fila)}
        style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
        <i className="bi bi-trash" style={{ fontSize: '18px', color: '#000000ff' }}></i>
      </button>
    </div>
  );

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaCategorias onBuscar={handleBuscar} />

      <TablaGenerica
        columnas={columnasCategorias}
        datos={categoriasPaginadas}
        renderOpciones={renderOpcionesCategoria}
      />

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}
        tipo="admin"
      />
    </div>
  );
};

export default CategoriasListado;
