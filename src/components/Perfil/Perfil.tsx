import React, { useEffect, useState } from 'react';
import './Perfil.css';
import ModalEdicion from './ModalEdicion';
import type { Usuario } from '../../types/usuario';

interface PerfilProps {
  tipo: 'vendedor' | 'admin';
}

const Perfil: React.FC<PerfilProps> = ({ tipo }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [campoAEditar, setCampoAEditar] = useState<string>('');
  const [valorCampo, setValorCampo] = useState<string>('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuarioLS = localStorage.getItem('usuario');
        if (!usuarioLS) return;

        const { id } = JSON.parse(usuarioLS);

        const res = await fetch(`http://localhost:5000/usuarios/${id}`);
        const data = await res.json();

        if (data.status === 'ok') {
          setUsuario(data.usuario);
        } else {
          alert('Error al cargar datos del usuario: ' + data.message);
        }
      } catch (err) {
        console.error(err);
        alert('Error al conectar con el servidor');
      }
    };

    fetchUsuario();
  }, [tipo]);

  const abrirModal = (campo: string, valor: string) => {
    setCampoAEditar(campo);
    setValorCampo(valor);
    setModalAbierto(true);
  };

  const guardarEdicion = async (nuevoValor: string) => {
    if (!usuario) return;

    try {
      const body: any = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        rol_id: usuario.rol_id
      };

      switch (campoAEditar) {
        case 'Nombre':
          body.nombre = nuevoValor;
          break;
        case 'Apellidos':
          body.apellido = nuevoValor;
          break;
        case 'Teléfono':
          body.telefono = nuevoValor;
          break;
      }

      const formData = new FormData();
      for (const key in body) {
        formData.append(key, body[key]);
      }

      const res = await fetch(`http://localhost:5000/usuarios/${usuario.id}`, {
        method: 'PUT',
        body: formData
      });

      const data = await res.json();

      if (data.status === 'ok') {
        setUsuario({ ...usuario, ...body });
      } else {
        alert('Error al actualizar: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    } finally {
      setModalAbierto(false);
    }
  };

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className={`perfil-container ${tipo}`}>
      <div className="perfil-form">
        <div className="perfil-avatar">
          {usuario.imagen ? (
            <img src={`http://localhost:5000/uploads/${usuario.imagen}`} alt="Perfil" />
          ) : (
            <div className="perfil-no-image">Sin foto</div>
          )}
          <input type="file" id="fotoPerfil" hidden />
          <label htmlFor="fotoPerfil" className="cargar-foto-btn">
            Cargar foto
          </label>
        </div>

        <div className="perfil-fields">
          <div className="row">
            <div>
              <label>Nombres:</label>
              <div className="editable-field" onClick={() => abrirModal('Nombre', usuario.nombre)}>
                <input type="text" value={usuario.nombre} readOnly />
              </div>
            </div>
            <div>
              <label>Apellidos:</label>
              <div className="editable-field" onClick={() => abrirModal('Apellidos', usuario.apellido)}>
                <input type="text" value={usuario.apellido} readOnly />
              </div>
            </div>
          </div>

          <div className="row">
            <div>
              <label>Teléfono:</label>
              <div className="editable-field" onClick={() => abrirModal('Teléfono', usuario.telefono)}>
                <input type="text" value={usuario.telefono} readOnly />
              </div>
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={usuario.correo} disabled />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Rol:</label>
              <input type="text" value={usuario.rol} disabled />
            </div>
            <div>
              <label>DNI:</label>
              <input type="text" value={usuario.dni} disabled />
            </div>
          </div>
        </div>
      </div>

      {modalAbierto && (
        <ModalEdicion
          campo={campoAEditar}
          valorInicial={valorCampo}
          onGuardar={guardarEdicion}
          onCerrar={() => setModalAbierto(false)}
          tipo={tipo}
        />
      )}
    </div>
  );
};

export default Perfil;
