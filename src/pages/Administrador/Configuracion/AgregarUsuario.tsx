import React, { useState } from "react";
import "../../../styles/AgregarGlobal.css";

const AgregarUsuario: React.FC = () => {
  // Estados controlados
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [dni, setDni] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre,
      apellido,
      telefono,
      email,
      rol,
      dni,
      imagen,
    };

    console.log("🧍‍♂️ Usuario registrado:", nuevoUsuario);

    // Aquí podrías enviar el usuario al backend
  };

  const handleReset = () => {
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
    setRol("");
    setDni("");
    setImagen(null);
  };

  return (
    <div className="StyleAgregarAmd">
      <button
        type="button"
        className="volver-btn"
        onClick={() => window.history.back()}
      >
        <i className="bi bi-chevron-compact-left" style={{ marginRight: "8px" }}></i>
        Volver
      </button>

      <h2>Registrar nuevo Usuario</h2>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        {/* Nombre y Apellido */}
        <div className="form-row">
          <div className="input-group">
            <label>
              Nombre <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              type="text"
              placeholder="nombre del usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>
              Apellido <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              type="text"
              placeholder="apellido del usuario"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Teléfono y Email */}
        <div className="form-row">
          <div className="input-group">
            <label>
              Teléfono <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              type="tel"
              placeholder="ej: 987654321"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>
              Email <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              type="email"
              placeholder="correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Rol y DNI */}
        <div className="form-row">
          <div className="input-group">
            <label>
              Rol <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                seleccione un rol
              </option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>

          <div className="input-group">
            <label>
              DNI <i className="bi bi-box-arrow-down-left"></i>
            </label>
            <input
              type="text"
              placeholder="número de documento"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
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
            <i className="bi bi-floppy-fill" style={{ marginRight: "8px" }}></i>
            Guardar
          </button>
          <button type="reset" className="limpiar-btn">
            <i className="bi bi-arrow-counterclockwise" style={{ marginRight: "9px" }}></i>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarUsuario;
