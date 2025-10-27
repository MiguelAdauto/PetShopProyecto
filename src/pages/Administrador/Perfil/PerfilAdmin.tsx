// src/pages/Administrador/Perfil/PerfilAdmin.tsx
import React from 'react';
import Perfil from '../../../components/Perfil/Perfil';  // Importamos el componente reutilizable

const PerfilAdmin: React.FC = () => {
  return (
    <div>
      <h1>Perfil del Administrador</h1>
      <Perfil tipo="admin" />  {/* Aquí pasamos el prop "tipo" como "admin" */}
    </div>
  );
};

export default PerfilAdmin;
