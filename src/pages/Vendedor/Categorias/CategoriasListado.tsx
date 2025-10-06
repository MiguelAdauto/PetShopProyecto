import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaCategorias from "./BusquedaCategorias";
import verIcon from '../../../assets/ver.svg'
import './BusquedaCategorias';

const columnasCategorias=[
    {key:'id', label:'ID',sortable: true},
    {key:'nombre', label:'Nombre',sortable: true},
    {key:'descripcion', label:'Descripcion',sortable: true},
]

const datosCategorias=[
    {
        id: '1',
        nombre: 'Juguetes',
        descripcion: 'Ubicado en la parte derecha de la pared'
    },
    {
        id: '2',
        nombre: 'Hogar',
        descripcion: 'Ubicados en la parte delantera del local'
    },
    {
        id: '3',
        nombre: 'Higiene',
        descripcion: 'Ubicado en el segundo nivel del estante delantero'
    },
];

const renderAccionesCatogira=(fila: any)=> (
    <div style={{display: 'flex', gap: '8px'}}>
        <img
            src={verIcon}
            alt="Ver Categoria"
            title="Ver Categoria"
            className="icono-opcion"
            onClick={() => console.log('Ver:', fila)}
    />
    </div>
);

const CategoriasListado=()=>{
    return(
        <div className="contenedor-ventas-listado">
            <BusquedaCategorias/>
            <TablaGenerica
            columnas={columnasCategorias}
        datos={datosCategorias}
        renderOpciones={renderAccionesCatogira}
      />
    </div>
    );
};
export default CategoriasListado;