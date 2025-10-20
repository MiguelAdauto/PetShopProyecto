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

  const links = [
    { to: '/vendedor/ventas', label: 'Ventas' },
    { to: '/vendedor/listado', label: 'Listado de ventas' },
    { to: '/vendedor/productos', label: 'Productos' },
    { to: '/vendedor/categorias', label: 'Categorías' },
    { to: '/vendedor/perfil', label: 'Perfil' },
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
