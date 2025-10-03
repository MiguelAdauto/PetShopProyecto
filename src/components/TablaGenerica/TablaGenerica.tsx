import './TablaGenerica.css';

const ventas = [
  {
    nro: '001',
    tipoPago: 'Yape',
    fecha: '17-09-2025 11:35 am',
    cliente: 'Pepito',
    total: 's/22:00'
  },
  {
    nro: '002',
    tipoPago: 'Plin',
    fecha: '17-09-2025 11:35 am',
    cliente: 'Luis',
    total: 's/12:00'
  },
  {
    nro: '003',
    tipoPago: 'Mixto',
    fecha: '17-09-2025 11:35 am',
    cliente: 'Camila',
    total: 's/11:00'
  }
];

const TablaGenerica = () => {
  return (
    <div className="tabla-contenedor">
      <table className="tabla-generica">
        <thead>
          <tr>
            <th>NRO.</th>
            <th>Tipo de Pago</th>
            <th>Fecha / Hora</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={index}>
              <td>{venta.nro}</td>
              <td>{venta.tipoPago}</td>
              <td>{venta.fecha}</td>
              <td>{venta.cliente}</td>
              <td>{venta.total}</td>
              <td>
                <span className="icono-opcion" />
                <span className="icono-opcion" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGenerica;
