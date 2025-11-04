import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../../styles/AgregarGlobal.css";

interface FormUsuarioProps {
  modo?: "agregar" | "editar";
}

interface Usuario {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  rol: string;
  dni: string;
  imagen?: File | null;
}

const FormUsuario: React.FC<FormUsuarioProps> = ({ modo = "agregar" }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados controlados
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [dni, setDni] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [cargando, setCargando] = useState(false);

  // Si estamos en modo editar, cargamos los datos del usuario
  useEffect(() => {
    if (modo === "editar" && id) {
      setCargando(true);
      // Simulación de fetch; reemplazar con tu API real
      fetch(`/api/usuarios/${id}`)
        .then(res => res.json())
        .then((data: Usuario) => {
          setNombre(data.nombre);
          setApellido(data.apellido);
          setTelefono(data.telefono);
          setEmail(data.email);
          setRol(data.rol);
          setDni(data.dni);
          setImagen(data.imagen || null);
        })
        .finally(() => setCargando(false));
    }
  }, [modo, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usuario: Usuario = { nombre, apellido, telefono, email, rol, dni, imagen };

    if (modo === "agregar") {
      console.log("🧍‍♂️ Agregando usuario:", usuario);
      // POST al backend
    } else {
      console.log("✏️ Editando usuario:", usuario);
      // PUT al backend usando id
    }

    // Redirigir al listado después de guardar
    navigate("/admin/usuarios");
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

  if (cargando) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="StyleAgregarAmd">
      <button
        type="button"
        className="volver-btn"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-chevron-compact-left" style={{ marginRight: "8px" }}></i>
        Volver
      </button>

      <h2>{modo === "agregar" ? "Registrar nuevo Usuario" : "Editar Usuario"}</h2>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        {/* Nombre y Apellido */}
        <div className="form-row">
          <div className="input-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="nombre del usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Apellido</label>
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
            <label>Teléfono</label>
            <input
              type="tel"
              placeholder="ej: 987654321"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
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
            <label>Rol</label>
            <select value={rol} onChange={(e) => setRol(e.target.value)} required>
              <option value="" disabled hidden>Seleccione un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>

          <div className="input-group">
            <label>DNI</label>
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
        <label>Agregar imagen</label>
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

export default FormUsuario;
