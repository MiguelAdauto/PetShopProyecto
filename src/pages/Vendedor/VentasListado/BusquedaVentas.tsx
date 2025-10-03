const BusquedaVentas = () => {
  return (
    <div className="barra-busqueda">
      <label>
        Cliente:
        <input type="text" placeholder="nombre del cliente" />
      </label>

      <label>
        Fecha:
        <input type="date" />
        <span> - </span>
        <input type="date" />
      </label>

      <button className="boton-buscar">Buscar</button> {/* Estilo global */}
    </div>
  );
};

export default BusquedaVentas;