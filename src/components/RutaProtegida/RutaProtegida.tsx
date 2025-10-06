import React from 'react';
import { Navigate } from 'react-router-dom';

interface RutaProtegidaProps {
  children: React.ReactNode;
  rolPermitido?: string;
}

const RutaProtegida: React.FC<RutaProtegidaProps> = ({ children, rolPermitido }) => {
  const rol = localStorage.getItem('rol');

  if (!rol) {
    return <Navigate to="/login" replace />;
  }

  if (rolPermitido && rol !== rolPermitido) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;
