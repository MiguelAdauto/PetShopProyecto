import './Sidebar.css';
import logo from '/src/assets/logosp.png';
import { NavLink } from 'react-router-dom';

const SidebarVendedor = () => {
  return (
    <div className="sidebar vendedor-sidebar">
      <img src={logo} alt="Logo" className="logo" />
      <NavLink to="/vendedor/ventas" className="nav-btn">Ventas</NavLink>
      <NavLink to="/vendedor/listado" className="nav-btn">Listado de ventas</NavLink>
      <NavLink to="/vendedor/productos" className="nav-btn">Productos</NavLink>
      <NavLink to="/vendedor/categorias" className="nav-btn">Categorías</NavLink>
      <NavLink to="/vendedor/perfil" className="nav-btn">Perfil</NavLink>
    </div>
  );
};

export default SidebarVendedor;