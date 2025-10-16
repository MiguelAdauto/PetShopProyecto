import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VendedorLayout from './layouts/VendedorLayout';
import AdminLayout from './layouts/AdminLayout';

import Ventas from './pages/Vendedor/Ventas/Ventas';
import VentasListado from './pages/Vendedor/VentasListado/VentasListado';
import DetalleVenta from './pages/Vendedor/VentasListado/DetalleVenta';
import ProductosListado from './pages/Vendedor/Productos/ProductosListado';
import CategoriasListado from './pages/Vendedor/Categorias/CategoriasListado';
import Perfil from './pages/Vendedor/Perfil/Perfil';

import AdminDashboard from './pages/Administrador/Dashboard/AdminDashboard'; // Asegúrate de tener este archivo
// Puedes agregar más páginas admin aquí, como Usuarios, Reportes, etc.

import Login from './pages/Login/Login';
import RutaProtegida from './components/RutaProtegida/RutaProtegida';

import './Styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Página de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas para VENDEDOR */}
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

        {/* Rutas protegidas para ADMINISTRADOR */}
        <Route
          path="/admin"
          element={
            <RutaProtegida rolPermitido="admin">
              <AdminLayout />
            </RutaProtegida>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* Aquí puedes agregar más rutas como /usuarios, /reportes, etc. */}
        </Route>

        {/* Si la ruta no existe */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;