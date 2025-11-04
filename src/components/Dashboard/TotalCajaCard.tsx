import React, { useState } from "react";
import { createPortal } from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Card.css";

interface TotalCajaCardProps {
  montoInicial?: number;
  onAbrirCaja?: (monto: number) => void;
  onCerrarCaja?: () => void;
}

const TotalCajaCard: React.FC<TotalCajaCardProps> = ({
  montoInicial = 0,
  onAbrirCaja,
  onCerrarCaja,
}) => {
  const [cajaAbierta, setCajaAbierta] = useState(false);
  const [monto, setMonto] = useState(montoInicial);
  const [fechaCaja, setFechaCaja] = useState<Date | null>(new Date());
  const [mostrarModal, setMostrarModal] = useState(false);
  const [montoNuevo, setMontoNuevo] = useState<number>(0);

  const abrirCaja = () => setMostrarModal(true);

  const confirmarApertura = () => {
    setCajaAbierta(true);
    setMonto(montoNuevo);
    setMostrarModal(false);
    onAbrirCaja?.(montoNuevo);
  };

  const cerrarCaja = () => {
    if (window.confirm("¿Estás seguro de cerrar la caja de este mes?")) {
      setCajaAbierta(false);
      setMonto(0);
      onCerrarCaja?.();
    }
  };

  return (
    <div className="dashboard-card">
      {/* CABECERA */}
      <div className="dashboard-card-header">
        <div className="dashboard-card-title">
          <i className="bi bi-wallet2"></i>
          <h3>Total en Caja del Mes</h3>
        </div>

        <div className="dashboard-card-actions">
          <DatePicker
            selected={fechaCaja}
            onChange={(date) => setFechaCaja(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="date-picker-input"
          />
        </div>
      </div>

      {/* MONTO */}
      <div className="dashboard-card-value">S/ {monto.toFixed(2)}</div>

      {/* BOTÓN */}
      <div className="card-actions">
        {cajaAbierta ? (
          <button className="btn-limpiar" onClick={cerrarCaja}>
            <i className="bi bi-box-arrow-right"></i> Cerrar Caja
          </button>
        ) : (
          <button className="btn-abrir" onClick={abrirCaja}>
            <i className="bi bi-cash-coin"></i> Abrir Caja
          </button>
        )}
      </div>

      {/* MODAL */}
      {mostrarModal &&
  createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Abrir Caja del Mes</h3>
        <p>Ingresa el monto inicial con el que se abrirá la caja.</p>
        <input
          type="number"
          className="monto-input"
          placeholder="Monto inicial (S/)"
          value={montoNuevo}
          onChange={(e) => setMontoNuevo(Number(e.target.value))}
        />
        <div className="modal-actions">
          <button
            className="btn-cancelar1"
            onClick={() => setMostrarModal(false)}
          >
            Cancelar
          </button>
          <button className="btn-confirmar1" onClick={confirmarApertura}>
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body
  )}
    </div>
  );
};

export default TotalCajaCard;
