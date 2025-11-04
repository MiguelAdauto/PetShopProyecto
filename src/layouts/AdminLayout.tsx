import SidebarAdmin from '../components/BarraLateral/SidebarAdmin';
import Header from '../components/Cabecera/Header';
import { Outlet, useLocation } from 'react-router-dom';

const getTitle = (path: string) => {
  if (path.includes('/admin/dashboard')) return 'Dashboard';
  if (path.includes('/admin/productos')) return 'Productos';
  if (path.includes('/admin/agregar-producto')) return 'Agregar Producto';
  if (path.includes('/admin/editar-producto')) return 'Editar Producto';
  if (path.includes('/admin/subcategorias')) return 'Subcategorías';
  if (path.includes('/admin/agregar-subcategoria')) return 'Agregar Subcategoría';
  if (path.includes('/admin/editar-subcategoria')) return 'Editar Subcategoría';
  if (path.includes('/admin/configuracion')) return 'Configuraciones';
  if (path.includes('/admin/categorias')) return 'Categorias';
  if (path.includes('/admin/usuarios')) return 'Usuarios';
  if (path.includes('/admin/agregar-usuario')) return 'Agregar Usuario';
  if (path.includes('/admin/editar-usuario')) return 'Editar Usuario';
  if (path.includes('/admin/reportes')) return 'Reporte Mensual';
  if (path.includes('/admin/detalle-cierre')) return 'Detalles de Cierres';
  if (path.includes('/admin/perfil')) return 'Perfil';
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
