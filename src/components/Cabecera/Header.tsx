import './Header.css';

interface HeaderProps {
  title: string;
  tipo?: 'vendedor' | 'admin'; // puede ser vendedor o admin
}

const Header = ({ title, tipo = 'vendedor' }: HeaderProps) => {
  return (
    <header className={`header ${tipo}-header`}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;