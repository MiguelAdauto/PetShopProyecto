// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VendedorLayout from './layouts/VendedorLayout';
import Ventas from './pages/Vendedor/Ventas/Ventas';
import VentasListado from './pages/Vendedor/VentasListado/VentasListado';
import DetalleVenta from './pages/Vendedor/VentasListado/DetalleVenta';
import Login from './pages/Login/Login';
import RutaProtegida from './components/RutaProtegida/RutaProtegida';
import './Styles/global.css';
import CategoriasListado from './pages/Vendedor/Categorias/CategoriasListado';
import ProductosListado from './pages/Vendedor/Productos/ProductosListado';
import Perfil from './pages/Vendedor/Perfil/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
