import React, { useState } from 'react';
import './AgregarProductos.css'; // Asegúrate de importar el CSS aquí

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nombre,
      precioCompra,
      precioVenta,
      stock,
      categoria,
      tipo,
      imagen,
    });
  };

  return (
    <div className="contenedor-agregar-producto">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Precio Compra:</label>
            <input
              type="number"
              value={precioCompra}
              onChange={(e) => setPrecioCompra(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Precio Venta:</label>
            <input
              type="number"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Categoría:</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
              <option value="">Seleccionar</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Aseo">Aseo</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>

          <div className="input-group">
            <label>Tipo:</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
              <option value="">Seleccionar</option>
              <option value="Mixto">Mixto</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
        </div>

        <label>Imagen:</label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImagen(e.target.files[0]);
            }
          }}
        />

        <div>
          <button type="submit" className="guardar">Guardar Producto</button>
          <button type="reset" className="limpiar">Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
