import React from 'react';
import './Perfil.css';

const Perfil: React.FC = () => {
  return (
    <div className="perfil-container">
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
          <input type="text" value="Alberto" disabled />
        </div>
        <div>
          <label>
            Apellidos: <i className="bi bi-box-arrow-down-left"></i>
          </label>
          <input type="text" value="Perez" disabled />
        </div>
      </div>

      <div className="row">
        <div>
          <label>
            Teléfono: <i className="bi bi-box-arrow-down-left"></i>
          </label>
          <input type="text" value="48165789" disabled />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value="top@gmail.com" disabled />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Rol:</label>
          <input type="text" value="Vendedor" disabled />
        </div>
        <div>
          <label>
            DNI: <i className="bi bi-box-arrow-down-left"></i>
          </label>
          <input type="text" value="48165789" disabled />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Perfil;
