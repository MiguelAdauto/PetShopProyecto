import { useState } from 'react';
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaUsuarios from "./BusquedaUsuarios";
import Paginacion from "../../../components/Paginacion/Paginacion";
import '../../../Styles/PaginasListado.css';
import userImg from '../../../assets/cuerda.jpg'; // Imagen genérica de usuario
import ModalUsuario from "../../../components/Modal/ModalUsuario"; // Modal para ver detalles

// Columnas de la tabla
const columnasUsuarios = [
  { key: 'id', label: '#', sortable: true },
  { key: 'imagen', label: 'Imagen' },
  { key: 'nombre', label: 'Nombre', sortable: true },
  { key: 'apellidos', label: 'Apellidos', sortable: true },
  { key: 'telefono', label: 'Teléfono', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'rol', label: 'Rol', sortable: true },
  { key: 'dni', label: 'DNI', sortable: true },
];

// Datos simulados de usuarios
const datosUsuarios = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  imagen: userImg,
  nombre: ['Carlos', 'Lucía', 'Pedro', 'María', 'Juan'][i % 5],
  apellidos: ['Ramírez', 'Gómez', 'Fernández', 'Pérez', 'Torres'][i % 5],
  telefono: `987654${(i + 10).toString().slice(-2)}`,
  email: `usuario${i + 1}@example.com`,
  rol: i % 2 === 0 ? 'Administrador' : 'Vendedor',
  dni: `48165${(i + 10).toString().slice(-3)}`,
}));

const UsuariosListado = () => {
  const [usuarios, setUsuarios] = useState(datosUsuarios);
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>(null);
  const filasPorPagina = 6;

  // Función de búsqueda
  const buscarUsuarios = (filtros: any) => {
    const filtrados = datosUsuarios.filter(u => {
      const coincideNombre =
        filtros.nombre === "" ||
        u.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
      const coincideDni =
        filtros.dni === "" || u.dni.toLowerCase().includes(filtros.dni.toLowerCase());
      const coincideTipo =
        filtros.tipo === "" ||
        (filtros.tipo === "vendedor" && u.rol === "Vendedor") ||
        (filtros.tipo === "admin" && u.rol === "Administrador");
      return coincideNombre && coincideDni && coincideTipo;
    });
    setUsuarios(filtrados);
    setPaginaActual(1);
  };

  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const usuariosPaginados = usuarios.slice(inicio, fin);
  const totalPaginas = Math.ceil(usuarios.length / filasPorPagina);

  const renderOpciones = (fila: any) => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        title="Ver Detalles"
        onClick={() => setUsuarioSeleccionado(fila)}
        style={{ cursor: "pointer", background: "none", border: "none" }}>
        <i className="bi bi-eye" style={{ fontSize: "20px", color: '#000' }}></i>
      </button>
    </div>
  );

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaUsuarios onBuscar={buscarUsuarios} />
      <TablaGenerica
        columnas={columnasUsuarios}
        datos={usuariosPaginados}
        renderOpciones={renderOpciones}/>
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPaginaChange={setPaginaActual}/>  
      <ModalUsuario
        usuario={usuarioSeleccionado}
        onClose={() => setUsuarioSeleccionado(null)}/>
    </div>
  );
};

export default UsuariosListado;
