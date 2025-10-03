import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">🐾</h2>
      <NavLink to="/vendedor/ventas" className="nav-btn">Ventas</NavLink>
      <NavLink to="/vendedor/listado" className="nav-btn">Listado de ventas</NavLink>
      <NavLink to="/vendedor/productos" className="nav-btn">Productos</NavLink>
      <NavLink to="/vendedor/categorias" className="nav-btn">Categorías</NavLink>
      <NavLink to="/vendedor/perfil" className="nav-btn">Perfil</NavLink>
    </div>
  );
};

export default Sidebar;