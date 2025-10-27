import React, { useState } from 'react';
import './ModalEdicion.css';  // Estilos para el modal

interface ModalEdicionProps {
  campo: string;                // Campo a editar (Ej. Nombre, Teléfono)
  valorInicial: string;         // Valor inicial del campo
  onGuardar: (nuevoValor: string) => void;   // Función para guardar el nuevo valor
  onCerrar: () => void;        // Función para cerrar el modal
  tipo: 'vendedor' | 'admin';  // Tipo de usuario (vendedor o admin)
}

const ModalEdicion: React.FC<ModalEdicionProps> = ({
  campo,
  valorInicial,
  onGuardar,
  onCerrar,
  tipo
}) => {
  const [valor, setValor] = useState(valorInicial);

  const handleGuardar = () => {
    if (valor.trim() === "") {
      alert("El campo no puede estar vacío.");
      return;
    }
    onGuardar(valor); // Llama la función que guardará el nuevo valor
  };

  return (
    <div className="modal-edicion">
      <div className={`modal-edicion-contenido ${tipo}`}>
        <h3>Editar {campo}</h3>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder={`Introduce nuevo ${campo}`}
        />
        <div className="modal-edicion-botones">
          <button className="cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="guardar" onClick={handleGuardar}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdicion;
