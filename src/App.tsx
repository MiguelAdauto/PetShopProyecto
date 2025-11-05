import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import VendedorLayout from './layouts/VendedorLayout';
import AdminLayout from './layouts/AdminLayout';

// Componentes
import RutaProtegida from './components/RutaProtegida/RutaProtegida';

// Estilos globales
import './Styles/global.css';

// Páginas - Login
import Login from './pages/Login/Login';

// Páginas - Vendedor
import Ventas from './pages/Vendedor/Ventas/Ventas';
import VentasListado from './pages/Vendedor/VentasListado/VentasListado';
import DetalleVenta from './pages/Vendedor/VentasListado/DetalleVenta';
import ProductosListado from './pages/Vendedor/Productos/ProductosListado';
import CategoriasListado from './pages/Vendedor/SubCategorias/SubCategoriasListado';
import CierresMensuales from './pages/Vendedor/CierresMensuales/CierresMensuales';
import PerfilVendedor from './pages/Vendedor/Perfil/PerfilVendedor.tsx';

// Páginas - Admin
import AdminDashboard from './pages/Administrador/Dashboard/AdminDashboard';
import ProductosAdmin from './pages/Administrador/ProductosAmd/ProductosListado';
import FormProductos from "./pages/Administrador/ProductosAmd/FormProductos";
import SubCategoriasAmd from "./pages/Administrador/SubCategoriasAmd/SubCategoriasAmd";
import FormSubCategoria from "./pages/Administrador/SubCategoriasAmd/FormSubCategoria";
import AdmConfiguracion from "./pages/Administrador/Configuracion/Configuracion";
import Categorias from "./pages/Administrador/Configuracion/Categorias";
import UsuariosListado from './pages/Administrador/Configuracion/Usuario/UsuariosListado';
import FormUsuario from "./pages/Administrador/Configuracion/Usuario/FormUsuario.tsx";
import TablaCierres from "./pages/Administrador/ReporteMensual/TablaCierres";
import Serie from "./pages/Administrador/Configuracion/Serie/Serie.tsx";
import DetalleCierreAdmin from "./pages/Administrador/ReporteMensual/DetalleCierreAdmin.tsx";
import PerfilAdmin from './pages/Administrador/Perfil/PerfilAdmin.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas - Vendedor */}
        <Route
          path="/vendedor"
          element={
            <RutaProtegida rolPermitido="vendedor">
              <VendedorLayout />
            </RutaProtegida>
          }
        >
          <Route path="ventas" element={<Ventas />} />
          <Route path="listado" element={<VentasListado />} />
          <Route path="listado/:id" element={<DetalleVenta />} />
          <Route path="productos" element={<ProductosListado />} />
          <Route path="categorias" element={<CategoriasListado />} />
          <Route path="reportes" element={<CierresMensuales />} />
          <Route path="perfil" element={<PerfilVendedor />} />
        </Route>

        {/* Rutas protegidas - Admin */}
        <Route
          path="/admin"
          element={
            <RutaProtegida rolPermitido="admin">
              <AdminLayout />
            </RutaProtegida>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="productos" element={<ProductosAdmin />} />
          <Route path="agregar-producto" element={<FormProductos modo="agregar" />} />
          <Route path="editar-producto" element={<FormProductos modo="editar" />} />
          <Route path="subcategorias" element={<SubCategoriasAmd />} />
          <Route path="agregar-subcategoria" element={<FormSubCategoria modo="agregar" />} />
          <Route path="editar-subcategoria/:id" element={<FormSubCategoria modo="editar" />} />

          {/* ✅ Configuración anidada correctamente */}
          <Route path="configuracion" element={<AdmConfiguracion />}>
            <Route path="serie" element={<Serie />} />
          </Route>

          <Route path="categorias" element={<Categorias />} />
          <Route path="usuarios" element={<UsuariosListado />} />
          <Route path="agregar-usuario" element={<FormUsuario modo="agregar" />} />
          <Route path="editar-usuario/:id" element={<FormUsuario modo="editar" />} />
          <Route path="reportes" element={<TablaCierres />} />
          <Route path="detalle-cierre/:id" element={<DetalleCierreAdmin />} />
          <Route path="perfil" element={<PerfilAdmin />} />
        </Route>

        {/* Ruta por defecto (404 o sin coincidencias) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
