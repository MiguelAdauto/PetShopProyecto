import './SidebarAdmin.css';
import logo from '/src/assets/LogoBlanco1.png';
import { NavLink } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <div className="sidebar admin-sidebar">
      <img src={logo} alt="Logo" className="logo" />
      <NavLink to="/admin/dashboard" className="nav-btn">Dashboard</NavLink>
    </div>
  );
};

export default SidebarAdmin;