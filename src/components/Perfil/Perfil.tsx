// src/components/Perfil/Perfil.tsx
import React, { useState } from 'react';
import './Perfil.css';
import ModalEdicion from './ModalEdicion'; // Modal reutilizable para la edición

interface PerfilProps {
  tipo: 'vendedor' | 'admin'; // Tipo de usuario, vendedor o admin
}

const Perfil: React.FC<PerfilProps> = ({ tipo }) => {
  // Datos del perfil (simulados para el ejemplo)
  const [nombre, setNombre] = useState(tipo === 'vendedor' ? 'Alberto' : 'Carlos');  // Datos dinámicos
  const [apellidos, setApellidos] = useState(tipo === 'vendedor' ? 'Perez' : 'Ramirez');
  const [telefono, setTelefono] = useState('48165789');
  const [email, setEmail] = useState(tipo === 'vendedor' ? 'vendedor@example.com' : 'admin@example.com');
  const [dni, setDni] = useState('48165789');
  const [rol, setRol] = useState(tipo === 'vendedor' ? 'Vendedor' : 'Administrador');  // Rol basado en el tipo

  const [modalAbierto, setModalAbierto] = useState(false);
  const [campoAEditar, setCampoAEditar] = useState<string>(''); // Campo que se editará
  const [valorCampo, setValorCampo] = useState<string>(''); // Valor actual del campo

  // Función para abrir el modal y seleccionar el campo a editar
  const abrirModal = (campo: string, valor: string) => {
    setCampoAEditar(campo);
    setValorCampo(valor);
    setModalAbierto(true);
  };

  // Función para guardar los cambios
  const guardarEdicion = (nuevoValor: string) => {
    if (campoAEditar === 'Nombre') {
      setNombre(nuevoValor);
    } else if (campoAEditar === 'Apellidos') {
      setApellidos(nuevoValor);
    } else if (campoAEditar === 'Teléfono') {
      setTelefono(nuevoValor);
    }
    setModalAbierto(false);
  };

  return (
    <div className={`perfil-container ${tipo}`}>
      <div className="perfil-form">
        <div className="perfil-avatar">
          <img src="/src/assets/LogoBlanco.png" alt="Perfil" />
          <input type="file" id="fotoPerfil" hidden />
          <label htmlFor="fotoPerfil" className="cargar-foto-btn">Cargar foto</label>
        </div>

        <div className="perfil-fields">
          <div className="row">
            <div>
              <label>
                Nombres: <i className="bi bi-box-arrow-down-left"></i>
              </label>
              <div className="editable-field" onClick={() => abrirModal('Nombre', nombre)}>
                <input type="text" value={nombre} />
              </div>
            </div>
            <div>
              <label>
                Apellidos: <i className="bi bi-box-arrow-down-left"></i>
              </label>
              <div className="editable-field" onClick={() => abrirModal('Apellidos', apellidos)}>
                <input type="text" value={apellidos} />
              </div>
            </div>
          </div>

          <div className="row">
            <div>
              <label>
                Teléfono: <i className="bi bi-box-arrow-down-left"></i>
              </label>
              <div className="editable-field" onClick={() => abrirModal('Teléfono', telefono)}>
                <input type="text" value={telefono} />
              </div>
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} disabled />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Rol:</label>
              <input type="text" value={rol} disabled />
            </div>
            <div>
              <label>DNI:</label>
              <input type="text" value={dni} disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar el modal solo si está abierto */}
      {modalAbierto && (
        <ModalEdicion
          campo={campoAEditar}
          valorInicial={valorCampo}
          onGuardar={guardarEdicion}
          onCerrar={() => setModalAbierto(false)}
          tipo={tipo}  // Pasamos el tipo de usuario (vendedor o admin)
        />
      )}
    </div>
  );
};

export default Perfil;
