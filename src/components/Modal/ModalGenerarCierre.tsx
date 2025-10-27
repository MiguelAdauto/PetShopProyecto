import React from "react";
import "./ModalGenerarCierre.css";

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
          <button className="cancelar-vendedor" onClick={onClose}>Cancelar</button>
          <button className="generar" onClick={onGenerar}>Generar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalGenerarCierre;
