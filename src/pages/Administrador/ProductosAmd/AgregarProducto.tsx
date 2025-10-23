import React, { useState } from "react";
import "./AgregarProductos.css"; // Asegúrate de importar el CSS aquí

const AgregarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);

  const precioTotal =
    Number(precioCompra) > 0 && Number(stock) > 0
      ? Number(precioCompra) * Number(stock)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nombre,
      codigo,
      precioCompra,
      precioVenta,
      stock,
      categoria,
      tipo,
      imagen,
      precioTotal,
    });
  };

  return (
    <div className="contenedor-agregar-producto">
      <form
        onSubmit={handleSubmit}
        onReset={() => {
          setNombre("");
          setCodigo("");
          setPrecioCompra("");
          setPrecioVenta("");
          setStock("");
          setCategoria("");
          setTipo("");
          setImagen(null);
        }}
      >
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
        <div className="form-row">
          <div className="input-group">
            <label>
              Nombre del Producto <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              placeholder="nombre del producto"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>
              Codigo <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              placeholder="codigo del producto"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>
              Precio de Compra <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              placeholder="precio de compra"
              type="number"
              value={precioCompra}
              onChange={(e) => setPrecioCompra(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>
              Precio de Venta <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              type="number"
              placeholder="precio de venta"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>
              Stock <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              type="number"
              placeholder="ingresar el stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Precio Total</label>
            <input type="number" value={precioTotal} readOnly />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>
              Categoría <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                seleccione una categoría
              </option>
              <option value="Juguetes">Juguetes</option>
              <option value="Aseo">Aseo</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>

          <div className="input-group">
            <label>
              Tipo de Mascota <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                seleccione un tipo de mascota
              </option>
              <option value="Mixto">Mixto</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
        </div>

        <label>
          Agregar imagen <i className="bi bi-box-arrow-down-left"></i>
        </label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImagen(e.target.files[0]);
            }
          }}
        />
        <div className="botones-row">
          <button type="submit" className="guardar-btn">
            <i className="bi bi-floppy-fill" style={{ marginRight: "8px" }}></i>{" "} Guardar
          </button>
          <button type="reset" className="limpiar-btn">
            <i className="bi-arrow-counterclockwise" style={{ marginRight: "9px" }}></i> Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
