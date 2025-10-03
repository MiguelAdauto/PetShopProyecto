import TablaGenerica from '../../../components/TablaGenerica/TablaGenerica';
import './VentasListado.css';
import BusquedaVentas from './BusquedaVentas';

const VentasListado = () => {
  return (
    <div className="contenedor-ventas-listado">
      <BusquedaVentas />
      <TablaGenerica />
    </div>
  );
};

export default VentasListado;