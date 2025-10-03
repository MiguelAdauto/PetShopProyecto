import Sidebar from '../components/BarraLateral/Sidebar';
import Header from '../components/Cabecera/Header';
import { Outlet, useLocation } from 'react-router-dom';

const getTitle = (path: string) => {
  if (path.includes('ventas')) return 'Ventas';
  // otras rutas...
  return 'Vendedor';
};

const VendedorLayout = () => {
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenedor principal: header + contenido */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header title={title} />

        {/* Aquí va el outlet (contenido de la ruta) */}
        <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendedorLayout;