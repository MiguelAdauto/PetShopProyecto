import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.jpg';
import fondo from '../../assets/portada.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'app@gmail.com' && password === '123456') {
      localStorage.setItem('rol', 'vendedor');
      navigate('/vendedor/ventas');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-box">
          <img src={logo} alt="Logo" className="login-logo" />
          <form onSubmit={handleLogin}>
            <label>Correo:</label>
            <input
              type="email"
              placeholder="Ingresar correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Ingresar contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}

            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
      <div className="login-right" style={{ backgroundImage: `url(${fondo})` }}></div>
    </div>
  );
};

export default Login;
