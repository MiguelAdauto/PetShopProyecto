// src/pages/Vendedor/VentasListado/VentasListado.tsx

import './VentasListado.css';
import { useState } from 'react';
import TablaGenerica from '../../../components/TablaGenerica/TablaGenerica'; // Componente de tabla reutilizable

// Datos estáticos de ventas
const ventasFicticias = [
  { boleta: 'B-101', tipoPago: 'Efectivo', fecha: '2025-09-30', cliente: 'Cliente 1', total: '20.00' },
  { boleta: 'B-102', tipoPago: 'Yape', fecha: '2025-09-30', cliente: 'Cliente 2', total: '30.00' },
  { boleta: 'B-103', tipoPago: 'Efectivo', fecha: '2025-09-30', cliente: 'Cliente 3', total: '15.00' },
  { boleta: 'B-104', tipoPago: 'Yape', fecha: '2025-09-30', cliente: 'Cliente 4', total: '25.00' },
  { boleta: 'B-105', tipoPago: 'Efectivo', fecha: '2025-09-30', cliente: 'Cliente 5', total: '40.00' },
  { boleta: 'B-106', tipoPago: 'Yape', fecha: '2025-09-30', cliente: 'Cliente 6', total: '50.00' },
];

const VentasListado = () => {
  // Estado para los filtros de búsqueda
  const [filtros, setFiltros] = useState({
    boleta: '',
    cliente: '',
    fecha: '',
  });

  // Filtrar ventas según los valores de búsqueda
  const ventasFiltradas = ventasFicticias.filter((venta) => {
    return (
      venta.boleta.includes(filtros.boleta) &&
      venta.cliente.toLowerCase().includes(filtros.cliente.toLowerCase()) &&
      (!filtros.fecha || venta.fecha === filtros.fecha)
    );
  });

  console.log(ventasFiltradas); // Verifica en la consola si se están mostrando las ventas filtradas

  return (
    <div className="ventas-listado-container">
      <h2>Listado de Ventas</h2>

      {/* Barra de búsqueda */}
      <div className="busqueda-ventas">
        <input
          type="text"
          placeholder="Buscar por Nro. Boleta"
          value={filtros.boleta}
          onChange={(e) => setFiltros({ ...filtros, boleta: e.target.value })}
        />
        <input
          type="text"
          placeholder="Buscar por Cliente"
          value={filtros.cliente}
          onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })}
        />
        <input
          type="date"
          placeholder="Fecha"
          value={filtros.fecha}
          onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
        />
        <button className="btn-buscar">Buscar</button>
      </div>

      {/* Tabla de ventas con los datos filtrados */}
      <TablaGenerica
        columnas={['Nro. Boleta', 'Tipo de Pago', 'Fecha/Hora', 'Cliente', 'Total', 'Opciones']}
        datos={ventasFiltradas} // Mostrar solo las ventas filtradas
        botones={true} // Botones de ver y descargar
      />
    </div>
  );
};

export default VentasListado;
