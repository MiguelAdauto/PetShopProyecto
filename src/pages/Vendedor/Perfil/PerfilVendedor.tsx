// src/pages/Vendedor/Perfil/PerfilVendedor.tsx
import React from 'react';
import Perfil from '../../../components/Perfil/Perfil';

const PerfilVendedor: React.FC = () => {
  return (
    <div>
      <Perfil tipo="vendedor" />  {/* Aquí pasamos el prop "tipo" como "vendedor" */}
    </div>
  );
};

export default PerfilVendedor;
