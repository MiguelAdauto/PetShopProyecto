type Props = {
  nombre: string;
  codigo: string;
  onNombreChange: (value: string) => void;
  onCodigoChange: (value: string) => void;
};

const SearchBar = ({ nombre, codigo, onNombreChange, onCodigoChange }: Props) => {
  return (
    <div className="search-bar">
      <label>
        Nombre:
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={nombre}
          onChange={(e) => onNombreChange(e.target.value)}
        />
      </label>
      <label>
        Código:
        <input
          type="text"
          placeholder="Buscar por código"
          value={codigo}
          onChange={(e) => onCodigoChange(e.target.value)}
        />
      </label>

      <button className="buscar-btn">Buscar</button>
    </div>
  );
};

export default SearchBar;