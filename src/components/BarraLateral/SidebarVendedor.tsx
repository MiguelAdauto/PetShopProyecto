import SidebarBase from './SidebarBase';
import logo from '/src/assets/logosp.png';
import { useNavigate } from 'react-router-dom';

const SidebarVendedor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/login');
  };

  // Ahora cada link tiene un 'icon' además de 'to' y 'label'
  const links = [
    { to: '/vendedor/ventas', label: 'Ventas', icon: 'bar-chart' },
    { to: '/vendedor/listado', label: 'Listado de ventas', icon: 'list-ul' },
    { to: '/vendedor/productos', label: 'Productos', icon: 'box' },
    { to: '/vendedor/categorias', label: 'SubCategorías', icon: 'tags' },
    { to: '/vendedor/reportes', label: 'Reporte Mensual', icon: 'calendar' },
    { to: '/vendedor/perfil', label: 'Perfil', icon: 'person' },
  ];

  return (
    <SidebarBase
      logo={logo}
      bgColor="#42baff"
      buttonColor="#0da5fd"
      links={links}
      onLogout={handleLogout}
    />
  );
};

export default SidebarVendedor;
