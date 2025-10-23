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
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/productos', label: 'Productos' },
    { to: '/admin/subcategorias', label: 'SubCategorias' },
    { to: '/admin/configuracion', label: 'Configuracion' },
    { to: '/admin/reportes', label: 'Reporte Mensual' },
    { to: '/admin/perfil', label: 'Perfil' },
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
