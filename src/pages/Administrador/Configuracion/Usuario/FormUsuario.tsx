import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../../../styles/AgregarGlobal.css";

interface FormUsuarioProps {
  modo?: "agregar" | "editar";
}

const FormUsuario: React.FC<FormUsuarioProps> = ({ modo = "agregar" }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();   // ← para recibir datos desde navigate()
  const navigate = useNavigate();

  const usuarioInicial = location.state || null;

  const [nombre, setNombre] = useState(usuarioInicial?.nombre || "");
  const [apellido, setApellido] = useState(usuarioInicial?.apellido || "");
  const [telefono, setTelefono] = useState(usuarioInicial?.telefono || "");
  const [correo, setCorreo] = useState(usuarioInicial?.correo || "");
  const [rolId, setRolId] = useState<number | "">(usuarioInicial?.rol_id || "");
  const [dni, setDni] = useState(usuarioInicial?.dni || "");
  const [contrasena, setContrasena] = useState(usuarioInicial?.contrasena || "");
  const [imagen, setImagen] = useState<File | null>(null);
  const [cargando, setCargando] = useState(false);

  // Si no llegó usuario desde navigate(), consultar backend
  useEffect(() => {
    if (modo === "editar" && id && !usuarioInicial) {
      setCargando(true);
      fetch(`http://localhost:5000/usuarios/${id}`) 
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            const u = data.usuario;

            setNombre(u.nombre);
            setApellido(u.apellido);
            setTelefono(u.telefono);
            setCorreo(u.correo);
            setRolId(u.rol_id);
            setDni(u.dni);
            setContrasena(u.contrasena);
          }
        })
        .finally(() => setCargando(false));
    }
  }, [modo, id, usuarioInicial]);

  const handleDniChange = (value: string) => {
    setDni(value);
    if (modo === "agregar") {
      setContrasena(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("telefono", telefono);
    formData.append("correo", correo);
    formData.append("rol_id", String(rolId));
    formData.append("dni", dni);

    if (modo === "agregar") {
      formData.append("contrasena", contrasena);
    }

    // Solo enviar archivo si se subió uno nuevo
    if (imagen) {
      formData.append("imagen", imagen);
    }

    const url =
      modo === "agregar"
        ? "http://localhost:5000/usuarios/"
        : `http://localhost:5000/usuarios/${id}`;

    const method = modo === "agregar" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        body: formData, // ← ya NO usamos JSON
      });

      const data = await res.json();
      if (data.status === "ok") {
        alert(modo === "agregar" ? "Usuario agregado" : "Usuario actualizado");
        navigate("/admin/usuarios");
      } else {
        alert(data.message || "Error");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error");
    }
  };

  if (cargando) return <p>Cargando usuario...</p>;


  return (
    <div className="StyleAgregarAmd">
      <button type="button" className="volver-btn" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-compact-left"></i> Volver
      </button>

      <h2>{modo === "agregar" ? "Registrar nuevo Usuario" : "Editar Usuario"}</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>Nombre: <i className="bi bi-pencil-square"></i></label>
            <input placeholder="Ingresar Nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>Apellido: <i className="bi bi-pencil-square"></i></label>
            <input placeholder="Ingresar Apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>Teléfono: <i className="bi bi-pencil-square"></i></label>
            <input placeholder="Ingresar Num telefono" required value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>

          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>Correo: <i className="bi bi-pencil-square"></i></label>
            <input
              placeholder="Ingresar correo de acceso"
              required
              value={correo}
              disabled={modo === "editar"}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>Rol: <i className="bi bi-pencil-square"></i></label>
            <select value={rolId} onChange={(e) => setRolId(Number(e.target.value))} required>
              <option value="" disabled>Seleccione un rol</option>
              <option value={1}>Administrador</option>
              <option value={2}>Vendedor</option>
            </select>
          </div>

          <div className="input-group">
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>DNI: <i className="bi bi-pencil-square"></i></label>
            <input
              placeholder="numero de documento"
              required
              value={dni}
              disabled={modo === "editar"}
              onChange={(e) => handleDniChange(e.target.value)}
            />
          </div>
        </div>

        {modo === "agregar" && (
          <div className="form-row">
            <div className="input-group">
              <label>Contraseña (DNI)</label>
              <input placeholder="Inicio de session con DNI" value={contrasena} disabled />
            </div>
          </div>
        )}

        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>Imagen <i className="bi bi-images"></i></label>
        <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files?.[0] || null)} />
        <div className="botones-row">
          <button type="submit" className="guardar-btn">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default FormUsuario;
