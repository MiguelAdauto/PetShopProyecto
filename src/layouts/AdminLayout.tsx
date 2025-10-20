import SidebarAdmin from '../components/BarraLateral/SidebarAdmin';
import Header from '../components/Cabecera/Header';
import { Outlet, useLocation } from 'react-router-dom';

const getTitle = (path: string) => {
  if (path.includes('/admin/dashboard')) return 'Dashboard';
  if (path.includes('/admin/productos')) return 'Productos';
  if (path.includes('/admin/agregar-producto')) return 'Agregar Productos';
  return 'Administrador';
};

const AdminLayout = () => {
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <SidebarAdmin />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header title={title} tipo="admin" />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;