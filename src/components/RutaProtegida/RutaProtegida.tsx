import React from 'react';
import { Navigate } from 'react-router-dom';

interface RutaProtegidaProps {
  children: React.ReactNode;
  rolPermitido?: string; // "admin" o "vendedor"
}

const RutaProtegida: React.FC<RutaProtegidaProps> = ({ children, rolPermitido }) => {
  const rol = localStorage.getItem('rol'); // 'admin' o 'vendedor'

  if (!rol) {
    // No hay sesión → redirige a login
    return <Navigate to="/login" replace />;
  }

  if (rolPermitido && rolPermitido.toLowerCase() !== rol) {
    // Rol no permitido → redirige a login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RutaProtegida;
