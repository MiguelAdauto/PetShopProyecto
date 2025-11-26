import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/AgregarGlobal.css";
import api from "../../../api/api";

interface ProductoFormProps {
  modo?: "agregar" | "editar";
}

const FormProductos: React.FC<ProductoFormProps> = ({ modo = "agregar" }) => {
  const location = useLocation();

  // Datos iniciales si venimos de editar
  const datosIniciales = location.state as
    | {
        id?: number;
        nombre: string;
        codigo: string;
        precio_compra: number;
        precio_venta: number;
        stock: number;
        categoria: string;
        subcategoria: string;
        categoria_id?: number;
        subcategoria_id?: number;
        imagen?: string | null;
      }
    | undefined;

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [precioCompra, setPrecioCompra] = useState<number | "">("");
  const [precioVenta, setPrecioVenta] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [categoria, setCategoria] = useState<number | "">("");
  const [subcategoria, setSubcategoria] = useState<number | "">("");
  const [imagen, setImagen] = useState<File | null>(null);

  // Para listar categorías y subcategorías
  const [categorias, setCategorias] = useState<
    { id: number; nombre: string }[]>([]);
  const [subcategorias, setSubcategorias] = useState<
    { id: number; nombre: string; descripcion?: string }[]>([]);

  // Precio total dinámico
  const precioTotal =
    precioCompra && stock ? Number(precioCompra) * Number(stock) : 0;

  // Cargar categorías al montar
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await api.get("/categorias");
        console.log("✅ Categorías cargadas:", res.data);
        setCategorias(res.data);
      } catch (err) {
        console.error("❌ Error cargando categorías:", err);
      }
    };
    fetchCategorias();
  }, []);

  // agregar subcategorías al cambiar categoría
  useEffect(() => {
    const fetchSubcategorias = async () => {
      try {
        const res = await api.get("/subcategorias");
        setSubcategorias(res.data.subcategorias);
        console.log("📌 DATOS INICIALES:", datosIniciales);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubcategorias();
  }, []);

  // Si estamos editando, llenar formulario con datos iniciales
  useEffect(() => {
    if (
      modo === "editar" &&
      datosIniciales &&
      categorias.length > 0 &&
      subcategorias.length > 0
    ) {
      // rellenar datos normales
      setNombre(datosIniciales.nombre);
      setCodigo(datosIniciales.codigo);
      setPrecioCompra(datosIniciales.precio_compra);
      setPrecioVenta(datosIniciales.precio_venta);
      setStock(datosIniciales.stock);

      // buscar categoría por nombre
      const cat = categorias.find((c) => c.nombre === datosIniciales.categoria);
      if (cat) setCategoria(cat.id);

      // buscar subcategoría por nombre
      const subcat = subcategorias.find(
        (s) => s.nombre === datosIniciales.subcategoria
      );
      if (subcat) setSubcategoria(subcat.id);
    }
  }, [modo, datosIniciales, categorias, subcategorias]);

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("codigo", codigo);
    formData.append("precio_compra", String(precioCompra));
    formData.append("precio_venta", String(precioVenta));
    formData.append("stock", String(stock));
    formData.append("categoria_id", String(categoria));
    formData.append("subcategoria_id", String(subcategoria));
    if (imagen) formData.append("imagen", imagen);

    try {
      if (modo === "editar" && datosIniciales?.id) {
        await api.put(`/productos/${datosIniciales.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Producto actualizado correctamente");
      } else {
        await api.post("/productos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Producto agregado correctamente");
      }
      handleReset();
    } catch (err) {
      console.error("❌ Error al guardar producto:", err);
      alert("Error al guardar el producto. Verifica los datos o el servidor.");
    }
  };

  // Resetear formulario
  const handleReset = () => {
    setNombre("");
    setCodigo("");
    setPrecioCompra("");
    setPrecioVenta("");
    setStock("");
    setCategoria("");
    setSubcategoria("");
    setImagen(null);
  };

  return (
    <div className="StyleAgregarAmd">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <button
          type="button"
          className="volver-btn"
          onClick={() => window.history.back()}>
          <i className="bi bi-chevron-compact-left"
            style={{ marginRight: "8px" }}
          ></i>
          Volver
        </button>

        <h2>{modo === "editar" ? "Editar Producto" : "Agregar Producto"}</h2>

        {/* Nombre y Código */}
        <div className="form-row">
          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Nombre del Producto: <i className="bi bi-pencil-square"></i>
            </label>
            <input
              placeholder="Inserte Nombre del Producto"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Código: <i className="bi bi-pencil-square"></i>
            </label>
            <input
              placeholder="Inserte Código"
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
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Precio de Compra: <i className="bi bi-pencil-square"></i>
            </label>
            <input
              placeholder="Inserte Precio de Compra"
              type="number"
              value={precioCompra}
              onChange={(e) => setPrecioCompra(Number(e.target.value))}
              min={0}
              required
            />
          </div>

          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Precio de Venta: <i className="bi bi-pencil-square"></i>
            </label>
            <input
              type="number"
              placeholder="Inserte Precio de Venta"
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
            <label
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              Stock: <i className="bi bi-pencil-square"></i>
            </label>
            <input
              type="number"
              placeholder="Inserte Stock"
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

        {/* Categoría y Subcategoría */}
        <div className="form-row">
          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}> Categoría: <i className="bi bi-pencil-square"></i></label>
            <select
              value={String(categoria)}
              onChange={(e) => setCategoria(Number(e.target.value))}
              required
              >
              <option value="">Seleccione una categoría </option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              Subcategoría: <i className="bi bi-pencil-square"></i>
            </label>
            <select
              value={String(subcategoria)}
              onChange={(e) => setSubcategoria(Number(e.target.value))}
              required
            >
              <option value="">Seleccione una subcategoría</option>
              {subcategorias.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Imagen */}
        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          Agregar imagen <i className="bi bi-images"></i>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImagen(e.target.files[0])}
        />

        {/* Botones */}
        <div className="botones-row">
          <button type="submit" className="guardar-btn">
            {modo === "editar" ? "Actualizar" : "Guardar"}
          </button>
          <button type="reset" className="limpiar-btn">
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProductos;
