import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendedorLayout from './layouts/VendedorLayout';
import Ventas from './pages/Vendedor/Ventas/Ventas';
import './Styles/global.css';
import VentasListado from './pages/Vendedor/VentasListado/VentasListado';


const Productos = () => <div>Productos</div>;
const Categorias = () => <div>Categorías</div>;
const Perfil = () => <div>Perfil</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/vendedor" element={<VendedorLayout />}>
          <Route path="ventas" element={<Ventas />} />
          <Route path="listado" element={<VentasListado />} />
          <Route path="productos" element={<Productos />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;