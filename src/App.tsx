// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VendedorLayout from './layouts/VendedorLayout';
import Ventas from './pages/Vendedor/Ventas/Ventas';
import VentasListado from './pages/Vendedor/VentasListado/VentasListado';
import DetalleVenta from './pages/Vendedor/VentasListado/DetalleVenta'; // 👈 NUEVO
import Login from './pages/Login/Login';
import RutaProtegida from './components/RutaProtegida/RutaProtegida';

import './Styles/global.css';
import CategoriasListado from './pages/Vendedor/Categorias/CategoriasListado';

const Productos = () => <div>Productos</div>;
const Perfil = () => <div>Perfil</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas para vendedor */}
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
          <Route path="listado/:id" element={<DetalleVenta />} /> {/* ✅ NUEVA RUTA */}
          <Route path="productos" element={<Productos />} />
          <Route path="categorias" element={<CategoriasListado />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
