const AgregarSubCategoria = () => {
  return (
    <div className="contenedor-agregar-producto">
      <button
          type="button"
          className="volver-btn"
          onClick={() => window.history.back()}
        >
          <i
            className="bi bi-arrow-left-circle-fill"
            style={{ marginRight: "8px" }}
          ></i>{" "}
          Volver
        </button>

      <h2>Agregar Subcategoría</h2>

      <form>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" placeholder="agregar subCategorias" />
          </div>

          <div className="input-group">
            <label htmlFor="descripcion">Descripción</label>
            <input type="text" id="descripcion" placeholder="ubicacion de la subCategoria" />
          </div>
        </div>

        <div className="botones-row">
          <button type="submit" className="guardar-btn">Guardar</button>
          <button type="reset" className="limpiar-btn">Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarSubCategoria;