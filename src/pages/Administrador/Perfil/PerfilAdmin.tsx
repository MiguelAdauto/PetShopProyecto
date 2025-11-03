// src/pages/Administrador/Perfil/PerfilAdmin.tsx
import React from 'react';
import Perfil from '../../../components/Perfil/Perfil'; 

const PerfilAdmin: React.FC = () => {
  return (
    <div>
      <Perfil tipo="admin" />  {/* Aquí pasamos el prop "tipo" como "admin" */}
    </div>
  );
};

export default PerfilAdmin;
