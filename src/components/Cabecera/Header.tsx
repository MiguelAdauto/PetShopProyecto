import './Header.css';

const Header = ({ title }: { title: string }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;