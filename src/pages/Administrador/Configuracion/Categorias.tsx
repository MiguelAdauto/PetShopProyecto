import React from "react";
import './Categorias.css';
import perroImg from '../../../assets/dog2.png';
import gatoImg from '../../../assets/cat2.png';
import GatoPerro from '../../../assets/DogAndCat.png';

const Categorias: React.FC = () => {
  return (
    <div className="configuracion-page">
      <div className="cards-container">
        {/* Perros */}
        <div className="config-card">
          <img src={perroImg} alt="Perro" className="card-icon" />
          <h2>Perros</h2>
        </div>

        {/* Gatos */}
        <div className="config-card">
          <img src={gatoImg} alt="Gato" className="card-icon" />
          <h2>Gatos</h2>
        </div>

        {/* Mixto */}
        <div className="config-card">
          <img src={GatoPerro} alt="Mixto" className="card-icon" />
          <h2>Mixto</h2>
        </div>
      </div>
      <div className="boton-volver-container">
  <button className="volver-btn" onClick={() => window.history.back()}>
    <i className="bi bi-arrow-left-circle-fill"></i> Volver
  </button>
</div>
    </div>
  );
};

export default Categorias;
