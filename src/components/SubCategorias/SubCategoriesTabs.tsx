import './SubCategoriesTabs.css';

type SubCategory = 'Juguetes' | 'Aseo' | 'Accesorios' | 'Hogar' | 'Comederos';

type Props = {
  selected: SubCategory;
  onChange: (value: SubCategory) => void;
};

const SubCategoriesTabs = ({ selected, onChange }: Props) => {
  const subcategorias: SubCategory[] = ['Juguetes', 'Aseo', 'Accesorios','Hogar','Comederos'];

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