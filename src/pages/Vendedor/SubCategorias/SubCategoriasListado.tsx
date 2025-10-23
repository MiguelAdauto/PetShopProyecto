import { useState, useEffect } from "react";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaCategorias from "./BusquedaSubCategorias";
import verIcon from '../../../assets/ver.svg';
import '../../../Styles/PaginasListado.css';
import './BusquedaSubCategorias';

const columnasCategorias = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'descripcion', label: 'Descripcion', sortable: true },
];

const datosCategoriasEstaticos = [
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

const renderAccionesCatogira = (fila: any) => (
    <div style={{ display: 'flex', gap: '8px' }}>
        <img
            src={verIcon}
            alt="Ver Categoria"
            title="Ver Categoria"
            className="icono-opcion"
            onClick={() => console.log('Ver:', fila)}
        />
    </div>
);

const CategoriasListado = () => {
    const [categorias, setCategorias] = useState(datosCategoriasEstaticos);

    useEffect(() => {
        // Aquí iría la lógica para obtener los datos del backend
        // Por ahora, estamos simulando con los datos estáticos.

        // Ejemplo de una llamada API que puedes usar más adelante:
        // fetch('https://api.example.com/categorias')
        //   .then(response => response.json())
        //   .then(data => setCategorias(data))
        //   .catch(error => console.error('Error al cargar las categorías:', error));

        // Este bloque simula que los datos llegan de una API después de 2 segundos
        setTimeout(() => {
            setCategorias(datosCategoriasEstaticos);  // Aquí se pueden actualizar con datos reales
        }, 2000);
    }, []);

    return (
        <div className="contenedor-pagina-listado">
            <BusquedaCategorias />
            <TablaGenerica
                columnas={columnasCategorias}
                datos={categorias}
                renderOpciones={renderAccionesCatogira}
            />
        </div>
    );
};

export default CategoriasListado;