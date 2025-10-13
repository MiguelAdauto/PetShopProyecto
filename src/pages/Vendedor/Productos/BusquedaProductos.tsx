const BusquedaCategorias = () => {
  return (
    <div className="barra-busqueda">
      <label>
        Nombre:
        <input type="text" placeholder="nombre de la categoria" />
      </label>
      <button className="boton-buscar">Buscar</button>
    </div>
  );
};

export default BusquedaCategorias;