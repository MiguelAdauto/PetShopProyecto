// src/pages/Vendedor/Perfil/PerfilVendedor.tsx
import React from 'react';
import Perfil from '../../../components/Perfil/Perfil';  // Importamos el componente reutilizable

const PerfilVendedor: React.FC = () => {
  return (
    <div>
      <h1>Perfil del Vendedor</h1>
      <Perfil tipo="vendedor" />  {/* Aquí pasamos el prop "tipo" como "vendedor" */}
    </div>
  );
};

export default PerfilVendedor;
