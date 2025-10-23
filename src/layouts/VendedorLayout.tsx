import Sidebar from '../components/BarraLateral/SidebarVendedor';
import Header from '../components/Cabecera/Header';
import { Outlet, useLocation } from 'react-router-dom';

const getTitle = (path: string) => {
  if (path.includes('/vendedor/listado')) return 'Listado de Ventas';
  if (path.includes('/vendedor/ventas')) return 'Ventas';
  if (path.includes('/vendedor/productos')) return 'Productos';
  if (path.includes('/vendedor/categorias')) return 'SubCategorías';
  if (path.includes('/vendedor/perfil')) return 'Perfil';
  return 'Vendedor';
};

const VendedorLayout = () => {
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    
    <div style={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header title={title} tipo="vendedor" />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendedorLayout;