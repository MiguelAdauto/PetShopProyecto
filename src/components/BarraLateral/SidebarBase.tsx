import './SidebarBase.css';
import { NavLink } from 'react-router-dom';

interface LinkItem {
  to: string;
  label: string;
  icon: string;  // Ahora es un string con el nombre del icono
}

interface SidebarBaseProps {
  logo: string;
  bgColor: string;
  buttonColor: string;
  links: LinkItem[];
  onLogout?: () => void;
}

const SidebarBase = ({ logo, bgColor, buttonColor, links, onLogout }: SidebarBaseProps) => {
  return (
    <div className="sidebar" style={{ backgroundColor: bgColor }}>
      <div>
        <img src={logo} alt="Logo" className="logo" />
        <div className="nav-links">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className="nav-btn"
              style={{ backgroundColor: buttonColor }}
            >
              <i className={`bi bi-${link.icon}`} style={{ fontSize: '1.5rem' }}></i>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      {onLogout && (
        <div className="logout-container">
          <button className="logout-btn" onClick={onLogout}>Cerrar Sesión <i className="bi bi-box-arrow-left" style={{ fontSize: "16px", color: "#ffffffff" }}></i></button>
        </div>
      )}
    </div>
  );
};

export default SidebarBase;
