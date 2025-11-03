import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/AgregarGlobal.css";

interface ProductoFormProps {
  modo?: "agregar" | "editar";
}

const FormProductos: React.FC<ProductoFormProps> = ({ modo = "agregar" }) => {
  const location = useLocation();

  // ✅ Datos iniciales que pueden venir del listado al editar
  const datosIniciales = location.state as
    | {
        id?: number;
        nombre: string;
        codigo: string;
        precioCompra: number;
        precioVenta: number;
        stock: number;
        categoria: string;
        tipo: string;
        imagen?: File | null;
      }
    | undefined;

  // ✅ Estados del formulario
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [precioCompra, setPrecioCompra] = useState<number | "">("");
  const [precioVenta, setPrecioVenta] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);

  // ✅ Calcular precio total automáticamente
  const precioTotal =
    precioCompra && stock ? Number(precioCompra) * Number(stock) : 0;

  // ✅ Efecto para cargar los datos si estamos en modo editar
  useEffect(() => {
    if (modo === "editar" && datosIniciales) {
      setNombre(datosIniciales.nombre);
      setCodigo(datosIniciales.codigo);
      setPrecioCompra(datosIniciales.precioCompra);
      setPrecioVenta(datosIniciales.precioVenta);
      setStock(datosIniciales.stock);
      setCategoria(datosIniciales.categoria);
      setTipo(datosIniciales.tipo);
      setImagen(datosIniciales.imagen || null);
    }
  }, [modo, datosIniciales]);

  // ✅ Manejo del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const producto = {
      nombre,
      codigo,
      precioCompra: Number(precioCompra),
      precioVenta: Number(precioVenta),
      stock: Number(stock),
      categoria,
      tipo,
      imagen,
      precioTotal,
    };

    if (modo === "editar") {
      console.log("✏️ Producto actualizado:", producto);
      // Aquí luego harás el PUT o PATCH con la API
    } else {
      console.log("🆕 Producto agregado:", producto);
      // Aquí luego harás el POST con la API
    }
  };

  // ✅ Resetear campos
  const handleReset = () => {
    setNombre("");
    setCodigo("");
    setPrecioCompra("");
    setPrecioVenta("");
    setStock("");
    setCategoria("");
    setTipo("");
    setImagen(null);
  };

  return (
    <div className="StyleAgregarAmd">
      <form onSubmit={handleSubmit} onReset={handleReset}>
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

        <h2>
          {modo === "editar" ? "Editar Producto" : "Agregar Producto"}
        </h2>

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
              value={precioCompra}
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
              value={precioVenta}
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
              value={stock}
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
              <option value="">Seleccione una categoría</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Aseo">Aseo</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Comederos">Comederos</option>
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
              <option value="">Seleccione un tipo de mascota</option>
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
            {modo === "editar" ? "Actualizar" : "Guardar"}
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

export default FormProductos;
