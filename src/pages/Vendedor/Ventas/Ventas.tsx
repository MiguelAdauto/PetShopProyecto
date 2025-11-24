import { useEffect, useState } from "react";
import BusquedaProductoV from "./BusquedaProductoV";
import CategoriesTabs from "../../../components/Categorías/CategoriesTabs";
import type { Category } from "../../../components/Categorías/CategoriesTabs"; // <-- import type
import SubCategoriesTabs from "../../../components/SubCategorias/SubCategoriesTabs";
import ResumenDeOrden from "../../../components/Carrito/ResumenDeOrden";
import api from "../../../api/api";
import "./Ventas.css";

type ProductoBD = {
  id: number;
  nombre: string;
  precio_venta: number;
  imagen: string;
  codigo: string;
  categoria: Category; // 'Perro' | 'Gato' | 'Mixto'
  subcategoria: string;
};

type ProductoCarrito = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
};

const Ventas = () => {
  const [productos, setProductos] = useState<ProductoBD[]>([]);
  const [subcategoriasVisibles, setSubcategoriasVisibles] = useState<string[]>([]);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState<string>('');
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [categoria, setCategoria] = useState<Category>("Mixto");

  // Cargar productos
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await api.get("/productos");
        const productosConvertidos = res.data.productos.map((p: any) => ({
          ...p,
          precio_venta: Number(p.precio_venta),
        }));
        setProductos(productosConvertidos);
      } catch (error) {
        console.log("ERROR productos:", error);
      }
    };
    cargarProductos();
  }, []);

  // Cargar subcategorías
  useEffect(() => {
    const cargarSubcategorias = async () => {
      try {
        const res = await api.get("/subcategorias/visibles");
        if (res.data.status === "ok") {
          const nombres: string[] = res.data.subcategorias.map((s: any) => s.nombre);
          setSubcategoriasVisibles(nombres);
          setSubcategoriaSeleccionada(nombres[0] || '');
        }
      } catch (error) {
        console.log("ERROR subcategorías:", error);
      }
    };
    cargarSubcategorias();
  }, []);

  // Filtrar productos
  const productosFiltrados = productos.filter((p) => {
    const coincideNombre =
      !filtros.nombre || p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());

    const coincideCodigo =
      !filtros.codigo || String(p.codigo).includes(filtros.codigo);

    const coincideSubcategoria =
      !subcategoriaSeleccionada || p.subcategoria === subcategoriaSeleccionada;

    const coincideCategoria =
      categoria === "Mixto" || p.categoria === categoria;

    return coincideNombre && coincideCodigo && coincideSubcategoria && coincideCategoria;
  });

  // Agregar al carrito
  const agregarAlCarrito = (producto: ProductoBD) => {
    setCarrito((prev) => {
      const existente = prev.find((p) => p.id === producto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [
        ...prev,
        { id: producto.id, nombre: producto.nombre, precio: producto.precio_venta, cantidad: 1 },
      ];
    });
  };

  return (
    <div className="ventas-container">
      <div className="productos-section">
        <BusquedaProductoV onBuscar={setFiltros} />

        <div className="productos-scroll">
          <div className="productos-grid">
            {productosFiltrados.length === 0 && <p>No hay productos</p>}
            {productosFiltrados.map((prod) => (
              <div
                key={prod.id}
                className="producto-card"
                onClick={() => agregarAlCarrito(prod)}
              >
                <img
                  src={`http://localhost:5000/uploads/${prod.imagen}`}
                  alt={prod.nombre}
                  className="producto-img"
                />
                <div className="producto-nombre">{prod.nombre}</div>
                <div className="producto-precio">S/{prod.precio_venta.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <CategoriesTabs
          selected={categoria}
          onChange={(cat) => setCategoria(cat)}
        />

        <SubCategoriesTabs
          subcategorias={subcategoriasVisibles}
          selected={subcategoriaSeleccionada}
          onChange={setSubcategoriaSeleccionada}
        />
      </div>

      <div className="resumen-section">
        <ResumenDeOrden carrito={carrito} setCarrito={setCarrito} />
      </div>
    </div>
  );
};

export default Ventas;
