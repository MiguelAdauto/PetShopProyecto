import React from "react";
import "./AdministradorCierre.css";

interface ModalProps {
  mes: string;
  anio: string;
  onClose: () => void;
  onGenerar: () => void;
}

const ModalGenerarCierre: React.FC<ModalProps> = ({ mes, anio, onClose, onGenerar }) => {
  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <p>¿Deseas generar el cierre mensual de {mes} {anio}?</p>
        <div className="modal-botones">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onGenerar}>Generar</button>
        </div>
      </div>    
    </div>
  );
};

export default ModalGenerarCierre;
