import './Header.css';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  // Obtenemos la info del usuario guardada en el login
  const usuarioStr = localStorage.getItem('usuario');
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

  const nombreUsuario = usuario?.nombre || 'USUARIO';
  const apellidoUsuario = usuario?.apellido || '';
  const rolUsuario = usuario?.rol || 'Vendedor';

  // Ruta de la imagen del usuario
  const imagenUsuario = usuario?.imagen
    ? `http://localhost:5000/uploads/${usuario.imagen}`
    : '/default-avatar.jpg'; // Pon este archivo en public/

  const tipo = rolUsuario === 'Administrador' ? 'admin' : 'vendedor';

  return (
    <header className={`header ${tipo}-header`}>
      <h1 className="header-title">{title}</h1>
      <div className="user-info">
        <div className="user-text">
          <span className="user-name">{nombreUsuario} {apellidoUsuario}</span>
          <span className="user-role">{rolUsuario}</span>
        </div>
        <div className="divider"></div>
        <img
          src={imagenUsuario}
          alt="Perfil"
          className="user-image"
          onError={(e) => {
            // Si falla, ponemos avatar por defecto
            (e.target as HTMLImageElement).src = '/default-avatar.jpg';
          }}
        />
      </div>
    </header>
  );
};

export default Header;
