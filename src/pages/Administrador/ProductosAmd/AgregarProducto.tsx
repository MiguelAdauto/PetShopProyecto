import React, { useState } from "react";
import "../../../styles/AgregarGlobal.css";


const AgregarProducto: React.FC = () => {
  // Estados
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [precioCompra, setPrecioCompra] = useState<number>(0);
  const [precioVenta, setPrecioVenta] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);

  // Cálculo automático del precio total
  const precioTotal = precioCompra > 0 && stock > 0 ? precioCompra * stock : 0;

  // Manejo del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      codigo,
      precioCompra,
      precioVenta,
      stock,
      categoria,
      tipo,
      imagen,
      precioTotal,
    };

    console.log("📦 Producto a guardar:", nuevoProducto);

    // Aquí puedes enviar los datos al backend si es necesario
  };

  // Manejo del reseteo del formulario
  const handleReset = () => {
    setNombre("");
    setCodigo("");
    setPrecioCompra(0);
    setPrecioVenta(0);
    setStock(0);
    setCategoria("");
    setTipo("");
    setImagen(null);
  };

  return (
    <div className="StyleAgregarAmd">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        {/* Botón de volver */}
        <button
          type="button"
          className="volver-btn"
          onClick={() => window.history.back()}
        >
          <i
            className="bi bi-chevron-compact-left"
            style={{ marginRight: "8px" }}
          ></i>
          Volver
        </button>

        <h2>Agregar Producto</h2>

        {/* Nombre y Código */}
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
              Código <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              placeholder="código del producto"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Precios */}
        <div className="form-row">
          <div className="input-group">
            <label>
              Precio de Compra <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              placeholder="precio de compra"
              type="number"
              value={precioCompra || ""}
              onChange={(e) => setPrecioCompra(Number(e.target.value))}
              min={0}
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
              value={precioVenta || ""}
              onChange={(e) => setPrecioVenta(Number(e.target.value))}
              min={0}
              required
            />
          </div>
        </div>

        {/* Stock y Precio Total */}
        <div className="form-row">
          <div className="input-group">
            <label>
              Stock <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              type="number"
              placeholder="ingresar el stock"
              value={stock || ""}
              onChange={(e) => setStock(Number(e.target.value))}
              min={0}
              required
            />
          </div>

          <div className="input-group">
            <label>Precio Total</label>
            <input type="number" value={precioTotal} readOnly />
          </div>
        </div>

        {/* Categoría y Tipo */}
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

        {/* Imagen */}
        <label>
          Agregar imagen <i className="bi bi-box-arrow-down-left"></i>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImagen(e.target.files[0]);
            }
          }}
        />

        {/* Botones */}
        <div className="botones-row">
          <button type="submit" className="guardar-btn">
            <i
              className="bi bi-floppy-fill"
              style={{ marginRight: "8px" }}
            ></i>
            Guardar
          </button>
          <button type="reset" className="limpiar-btn">
            <i
              className="bi bi-arrow-counterclockwise"
              style={{ marginRight: "9px" }}
            ></i>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
