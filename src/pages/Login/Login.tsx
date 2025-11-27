import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.jpg';
import fondo from '../../assets/portada.png';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;      // Administrador | Vendedor (bonito para mostrar)
  imagen?: string;  // foto
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      const text = await response.text();
      console.log('Response text:', text);

      const data = JSON.parse(text);

      if (data.status === 'ok') {
        // Rol bonito para mostrar en la UI
        const rolBonito =
          data.user.rol === 'admin' ? 'Administrador' : 'Vendedor';

        const usuario: Usuario = {
          id: data.user.id,
          nombre: data.user.nombre,
          apellido: data.user.apellido,
          correo: data.user.correo,
          rol: rolBonito,
          imagen: data.user.imagen || '',
        };

        // Guardamos la info del usuario para mostrar en header
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Guardamos el rol EXACTO que necesita el backend
        localStorage.setItem('rol', data.user.rol); // admin | vendedor

        // Redirección
        if (data.user.rol === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/vendedor/ventas');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
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

      <div
        className="login-right"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>
    </div>
  );
};

export default Login;
