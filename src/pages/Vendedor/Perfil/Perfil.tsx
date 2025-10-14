import React from 'react';
import './Perfil.css';

const Perfil: React.FC = () => {
  return (
    <div className="perfil-container">
      <div className="perfil-form">
        <div className="perfil-avatar">
          <label htmlFor="fotoPerfil">
            <img src="/src/assets/cuerda.jpg" alt="Perfil" />
          </label>
          <input type="file" id="fotoPerfil" hidden />
          <div className="overlay-text">Agregar foto de perfil</div>
        </div>

        <div className="perfil-fields">
          <div className="row">
            <div>
              <label>Nombres:</label>
              <input type="text" value="Alberto" disabled />
            </div>
            <div>
              <label>Apellidos:</label>
              <input type="text" value="Perez" disabled />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Teléfono:</label>
              <input type="text" value="48165789" disabled />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value="albertop@gmail.com" disabled />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Rol:</label>
              <input type="text" value="Vendedor" disabled />
            </div>
            <div>
              <label>DNI:</label>
              <input type="text" value="48165789" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
