import './SidebarBase.css';
import { NavLink } from 'react-router-dom';

interface LinkItem {
  to: string;
  label: string;
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
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
      {onLogout && (
        <div className="logout-container">
          <button className="logout-btn" onClick={onLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarBase;
