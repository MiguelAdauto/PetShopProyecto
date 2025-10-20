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

  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'vendedor@example.com', password: 'vendedor123', role: 'vendedor' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      if (user.role === 'admin') {
        localStorage.setItem('rol', 'admin');
        navigate('/admin/dashboard');
      } else {
        localStorage.setItem('rol', 'vendedor');
        navigate('/vendedor/ventas');
      }
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
            <label htmlFor="login-email">Correo:</label>
            <input
              type="email"
              id="login-email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="login-password">Contraseña:</label>
            <input
              type="password"
              id="login-password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}

            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
      <div className="login-right" style={{ backgroundImage: `url(${fondo})` }}></div>
    </div>
  );
};

export default Login;
