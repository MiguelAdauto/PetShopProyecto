import React from 'react';
import './ModalUsuario.css';

interface Usuario {
  imagen: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  rol: string;
  dni: string;
}

interface ModalUsuarioProps {
  usuario: Usuario | null;
  onClose: () => void;
}

const ModalUsuario: React.FC<ModalUsuarioProps> = ({ usuario, onClose }) => {
  if (!usuario) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Botón de cerrar */}
        <button className="close-button" onClick={onClose}>X</button>

        {/* Título */}
        <h2>Detalles del Usuario</h2>

        <div className="modal-body">
          {/* Imagen del usuario */}
          <img src={usuario.imagen} alt={usuario.nombre} className="modal-image" />

          {/* Información del usuario */}
          <div className="modal-info">
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Rol:</strong> {usuario.rol}</p>
            <p><strong>DNI:</strong> {usuario.dni}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;
