import './SidebarAdmin.css';
import logo from '/src/assets/LogoBlanco1.png';
import { NavLink } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <div className="admin-sidebar">
      <img src={logo} alt="Logo" className="logo" />

      <NavLink to="/admin/dashboard" className="nav-btn">Dashboard</NavLink>

      <NavLink to="/admin/productos" className="nav-btn">Productos</NavLink>
    </div>
  );
};

export default SidebarAdmin;