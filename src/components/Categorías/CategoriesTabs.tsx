import './CategoriesTabs.css';

// Exportamos el tipo Category
export type Category = 'Perro' | 'Gato' | 'Mixto';

type Props = {
  selected: Category;
  onChange: (value: Category) => void;
};

const CategoriesTabs = ({ selected, onChange }: Props) => {
  const categorias: Category[] = ['Perro', 'Gato', 'Mixto'];

  return (
    <div className="categories-tabs">
      {categorias.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${selected === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoriesTabs;
