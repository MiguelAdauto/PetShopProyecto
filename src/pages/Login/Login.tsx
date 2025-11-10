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

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch("http://127.0.0.1:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo: email, contrasena: password }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      const role = data.user.rol;
      localStorage.setItem("rol", role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/vendedor/ventas");
      }
    } else {
      setError(data.message);
    }
  } catch (err) {
    setError("Error al conectar con el servidor");
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
