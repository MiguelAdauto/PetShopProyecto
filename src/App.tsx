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
import CategoriasListado from './pages/Vendedor/Categorias/CategoriasListado';
import Perfil from './pages/Vendedor/Perfil/Perfil';

// Páginas - Admin
import AdminDashboard from './pages/Administrador/Dashboard/AdminDashboard';
import ProductosAdmin from './pages/Administrador/ProductosAmd/ProductosListado';

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
          <Route path="perfil" element={<Perfil />} />
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
        </Route>

        {/* Ruta por defecto (404 o sin coincidencias) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
