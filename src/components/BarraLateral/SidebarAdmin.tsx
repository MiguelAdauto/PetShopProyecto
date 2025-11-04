import SidebarBase from './SidebarBase';
import logo from '/src/assets/LogoBlanco1.png';
import { useNavigate } from 'react-router-dom';

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/login');
  };

 const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'bar-chart-fill' },
  { to: '/admin/productos', label: 'Productos', icon: 'box-seam' },
  { to: '/admin/subcategorias', label: 'SubCategorias', icon: 'tags-fill' },
  { to: '/admin/configuracion', label: 'Configuracion', icon: 'gear-fill' },
  { to: '/admin/reportes', label: 'Reporte Mensual', icon: 'file-earmark-bar-graph' },
  { to: '/admin/perfil', label: 'Perfil', icon: 'person-circle' },
];

  return (
    <SidebarBase
      logo={logo}
      bgColor="#191A4A"
      buttonColor="#4143BE"
      links={links}
      onLogout={handleLogout}
    />
  );
};

export default SidebarAdmin;
