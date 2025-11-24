// SubCategoriesTabs.tsx
import './SubCategoriesTabs.css';

type Props = {
  subcategorias: string[];
  selected: string;
  onChange: (value: string) => void;
};

const SubCategoriesTabs = ({ subcategorias, selected, onChange }: Props) => {
  return (
    <div className="subcategories-tabs">
      {subcategorias.map((sub) => (
        <button
          key={sub}
          className={`subcategory-btn ${selected === sub ? 'active' : ''}`}
          onClick={() => onChange(sub)}
        >
          {sub}
        </button>
      ))}
    </div>
  );
};

export default SubCategoriesTabs;
