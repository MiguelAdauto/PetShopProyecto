import './Sidebar.css';
import logo from '/src/assets/logosp.png';
import { NavLink, useNavigate } from 'react-router-dom';

const SidebarVendedor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('rol');

    navigate('/login');
  };

  return (
    <div className="vendedor-sidebar">
      <div>
        <img src={logo} alt="Logo" className="logo" />
        <div className="nav-links">
          <NavLink to="/vendedor/ventas" className="nav-btn">Ventas</NavLink>
          <NavLink to="/vendedor/listado" className="nav-btn">Listado de ventas</NavLink>
          <NavLink to="/vendedor/productos" className="nav-btn">Productos</NavLink>
          <NavLink to="/vendedor/categorias" className="nav-btn">Categorías</NavLink>
          <NavLink to="/vendedor/perfil" className="nav-btn">Perfil</NavLink>
        </div>
      </div>
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default SidebarVendedor;