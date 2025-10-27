////Aparttado de categorias
import { useState, useEffect } from "react";
import TablaGenerica from "../../../components/TablaGenerica/TablaGenerica";
import BusquedaCategorias from "./BusquedaSubCategorias";
import './BusquedaSubCategorias';
import '../../../Styles/PaginasListado.css';

const columnasCategorias = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'descripcion', label: 'Descripcion', sortable: true },
    // Elimina esta línea para evitar la columna vacía
    // { key: 'productos', label: 'Ver Productos', sortable: true },
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
    <div style={{ display: 'flex', gap: '12px'}}>
        {/* Botón Ver Productos */}
        <button
          title="Ver Productos"
          onClick={() => console.log('Ver productos de categoría:', fila)}
          style={{ cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <i className="bi bi-box-seam" style={{ fontSize: '18px', color: '#4143BE' }}></i>
        </button>

        {/* Botón Editar */}
        <button
          title="Editar Categoría"
          onClick={() => console.log('Editar categoría:', fila)}
          style={{ cursor: 'pointer', background: 'none'}}
        >
          <i className="bi bi-pencil-square" style={{ fontSize: '18px', color: '#2c2e86' }}></i>
        </button>

        {/* Botón Borrar */}
        <button
          title="Borrar Categoría"
          onClick={() => console.log('Borrar categoría:', fila)}
          style={{ cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <i className="bi bi-trash-fill" style={{ fontSize: '18px', color: '#d9534f' }}></i>
        </button>
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
            <BusquedaCategorias onBuscar={(filtros) => console.log("Buscando con filtros:", filtros)} />
            <TablaGenerica
                columnas={columnasCategorias}
                datos={categorias}
                renderOpciones={renderAccionesCatogira}
            />
        </div>
    );
};

export default CategoriasListado;