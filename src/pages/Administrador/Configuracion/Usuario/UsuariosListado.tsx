import { useState, useEffect } from 'react';
import TablaGenerica from "../../../../components/TablaGenerica/TablaGenerica";
import BusquedaUsuarios from "./BusquedaUsuarios";
import Paginacion from "../../../../components/Paginacion/Paginacion";
import ModalUsuario from "../../../../components/Modal/ModalUsuario";
import { useNavigate } from 'react-router-dom';
import type { Usuario } from '../../../../types/usuario';
import '../../../../Styles/PaginasListado.css';

interface UsuarioBackend {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  rol_id: number;
  dni: string;
  estado: boolean;
  imagen?: string;
}

const columnasUsuarios = [
  { key: 'id', label: '#', sortable: true },
  { key: 'imagen', label: 'Imagen' },
  { key: 'nombre', label: 'Nombre', sortable: true },
  { key: 'apellido', label: 'Apellidos', sortable: true },
  { key: 'telefono', label: 'Teléfono', sortable: true },
  { key: 'correo', label: 'Email', sortable: true },
  { key: 'rol', label: 'Rol', sortable: true },
  { key: 'dni', label: 'DNI', sortable: true },
  { key: 'estado', label: 'Estado', sortable: true },
];

const filasPorPagina = 6;

const UsuariosListado = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosOriginales, setUsuariosOriginales] = useState<Usuario[]>([]); // Para guardar todos los usuarios y poder restablecer los filtros
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  // Cargar usuarios desde backend
  const cargarUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:5000/usuarios/');
      const data = await res.json();

      if (data.status === 'ok') {
        const usuariosConRol: Usuario[] = data.usuarios.map((u: UsuarioBackend) => ({
          id: u.id,
          nombre: u.nombre,
          apellido: u.apellido,
          telefono: u.telefono,
          correo: u.correo,
          dni: u.dni,
          estado: u.estado ?? false,
          imagen: u.imagen || '',
          rol_id: u.rol_id,
          rol: u.rol_id === 1 ? 'Administrador' : 'Vendedor',
        }));
        setUsuarios(usuariosConRol);
        setUsuariosOriginales(usuariosConRol); // Guardar todos los usuarios
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Actualizar estado en tabla y backend
  const actualizarEstadoUsuario = (id: number, nuevoEstado: boolean) => {
    setUsuarios(prev =>
      prev.map(u => u.id === id ? { ...u, estado: nuevoEstado } : u)
    );

    setUsuarioSeleccionado(prev =>
      prev && prev.id === id ? { ...prev, estado: nuevoEstado } : prev
    );

    fetch(`http://localhost:5000/usuarios/${id}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status !== 'ok') alert('Error al actualizar estado en la BD');
    })
    .catch(err => {
      console.error(err);
      alert('Error al actualizar estado en la BD');
    });
  };

  const borrarUsuario = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const res = await fetch(`http://localhost:5000/usuarios/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.status === 'ok') {
        setUsuarios(usuarios.filter(u => u.id !== id));
      } else {
        alert(data.message || 'Error al borrar usuario');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Búsqueda de usuarios con filtros
  const buscarUsuarios = (filtros: any) => {
    if (!filtros.nombre && !filtros.dni && !filtros.tipo) {
      setUsuarios(usuariosOriginales); // Si no hay filtros, mostrar todos
      return;
    }

    const filtrados = usuariosOriginales.filter(u => {
      const coincideNombre = !filtros.nombre || u.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
      const coincideDni = !filtros.dni || u.dni.toLowerCase().includes(filtros.dni.toLowerCase());
      const coincideTipo = !filtros.tipo || (filtros.tipo === "vendedor" && u.rol === "Vendedor") || (filtros.tipo === "admin" && u.rol === "Administrador");
      return coincideNombre && coincideDni && coincideTipo;
    });
    setPaginaActual(1); // Resetear la página cuando los filtros cambian
    setUsuarios(filtrados);
  };

  // Paginación
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const usuariosPaginados = usuarios.slice(inicio, fin);
  const totalPaginas = Math.ceil(usuarios.length / filasPorPagina);

  // Renderizar celdas personalizadas
  const renderCustomCell = (key: string, value: any) => {
    if (key === "imagen") {
      if (!value) return <span>No hay foto</span>;
      const src = `http://localhost:5000/uploads/${value}`;
      return <img src={src} alt="Usuario" style={{ width: 50, height: 50, borderRadius: 6 }} />;
    }
    if (key === 'estado') {
      return (
        <span style={{
          padding: '3px 8px',
          borderRadius: '5px',
          color: 'white',
          backgroundColor: value ? '#4caf50' : '#f44336'
        }}>
          {value ? 'Activo' : 'Desactivado'}
        </span>
      );
    }
    return value;
  };

  const renderOpciones = (fila: Usuario) => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        title="Ver Detalles"
        onClick={() => setUsuarioSeleccionado(fila)}
        style={{ cursor: "pointer", background: "none", color: "#000", border: "none" }}
      >
        <i className="bi bi-eye" style={{ fontSize: "20px" }}></i>
      </button>

      <button
        title="Editar Usuario"
        onClick={() => navigate(`/admin/editar-usuario/${fila.id}`, { state: fila })}
        style={{ cursor: "pointer", background: "none", color: "#000", border: "none" }}
      >
        <i className="bi bi-pencil-square" style={{ fontSize: "18px" }}></i>
      </button>

      <button
        title="Borrar Usuario"
        onClick={() => borrarUsuario(fila.id)}
        style={{ cursor: "pointer", background: "none", color: "#000", border: "none" }}
      >
        <i className="bi bi-trash" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );

  return (
    <div className="contenedor-pagina-listado">
      <BusquedaUsuarios onBuscar={buscarUsuarios} />

      <TablaGenerica
        columnas={columnasUsuarios}
        datos={usuariosPaginados}
        renderOpciones={renderOpciones}
        renderCell={renderCustomCell}
      />

      <Paginacion 
        paginaActual={paginaActual} 
        totalPaginas={totalPaginas} 
        onPaginaChange={setPaginaActual} 
        tipo="admin" 
      />

      <ModalUsuario 
        usuario={usuarioSeleccionado ? {
          id: usuarioSeleccionado.id,
          nombre: usuarioSeleccionado.nombre,
          apellido: usuarioSeleccionado.apellido,
          telefono: usuarioSeleccionado.telefono,
          correo: usuarioSeleccionado.correo,
          dni: usuarioSeleccionado.dni,
          estado: usuarioSeleccionado.estado ?? false,
          imagen: usuarioSeleccionado.imagen,
          rol: usuarioSeleccionado.rol ?? (usuarioSeleccionado.rol_id === 1 ? 'Administrador' : 'Vendedor')
        } : null}
        onClose={() => setUsuarioSeleccionado(null)}
        onToggleEstado={actualizarEstadoUsuario}
      />
    </div>
  );
};

export default UsuariosListado;
