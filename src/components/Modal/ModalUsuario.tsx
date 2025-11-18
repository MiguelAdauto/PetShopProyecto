import React from 'react';
import './ModalUsuario.css';

interface UsuarioModal {
  id: number;
  imagen?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  rol: string;
  dni: string;
  estado: boolean;
}

interface ModalUsuarioProps {
  usuario: UsuarioModal | null;
  onClose: () => void;
  onToggleEstado?: (id: number, nuevoEstado: boolean) => void;
}

const ModalUsuario: React.FC<ModalUsuarioProps> = ({ usuario, onClose, onToggleEstado }) => {
  if (!usuario) return null;

  const handleToggleEstado = () => {
    if (onToggleEstado) {
      onToggleEstado(usuario.id, !usuario.estado);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Detalles del Usuario</h2>

        <div className="modal-body">
          {usuario.imagen ? (
            <img
              src={`http://localhost:5000/uploads/${usuario.imagen}`}
              alt={usuario.nombre}
              className="modal-image"
              style={{ width: 120, height: 120, borderRadius: 8 }}
            />
          ) : (
            <div
              className="modal-image"
              style={{
                width: 120,
                height: 120,
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#ccc',
                color: '#555'
              }}
            >
              Sin foto
            </div>
          )}

          <div className="modal-info">
            <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
            <p><strong>Email:</strong> {usuario.correo}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            <p><strong>DNI:</strong> {usuario.dni}</p>
            <p><strong>Rol:</strong> {usuario.rol}</p>
            <p>
              <strong>Estado:</strong>{' '}
              <span
                style={{
                  padding: '3px 8px',
                  borderRadius: 5,
                  color: 'white',
                  backgroundColor: usuario.estado ? '#4caf50' : '#f44336'
                }}
              >
                {usuario.estado ? 'Activo' : 'Desactivado'}
              </span>
            </p>

            {onToggleEstado && (
              <button
                style={{ marginTop: 10, padding: '6px 12px', cursor: 'pointer' }}
                onClick={handleToggleEstado}
              >
                {usuario.estado ? 'Desactivar' : 'Activar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;
