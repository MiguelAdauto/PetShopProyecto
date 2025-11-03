import './Header.css';
import perfilImg from '../../assets/cuerda.jpg';

interface HeaderProps {
  title: string;
  tipo?: 'vendedor' | 'admin';
}

const Header = ({ title, tipo = 'vendedor' }: HeaderProps) => {
  const nombreUsuario = tipo === 'admin' ? 'CARLOS RAMÍREZ' : 'ALBERTO PÉREZ';
  const rolUsuario = tipo === 'admin' ? 'Administrador' : 'Vendedor';

  return (
    <header className={`header ${tipo}-header`}>
      <h1 className="header-title">{title}</h1>
      <div className="user-info">
        <div className="user-text">
          <span className="user-name">{nombreUsuario}</span>
          <span className="user-role">{rolUsuario}</span>
        </div>
        <div className="divider"></div>
        <img src={perfilImg} alt="Perfil" className="user-image" />
      </div>
    </header>
  );
};

export default Header;