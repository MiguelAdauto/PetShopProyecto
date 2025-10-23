import React from "react";
import "./AdministradorCierre.css";

interface TablaCierresProps {
  mes: string;
  anio: string;
  cierres: any[];
}

const TablaCierres: React.FC<TablaCierresProps> = ({ mes, anio, cierres }) => {
  if (cierres.length === 0) {
    return <p className="sin-cierres">No existe cierre generado para {mes} {anio}</p>;
  }

  return (
    <table className="tabla-cierres">
      <thead>
        <tr>
          <th>#</th>
          <th>Mes</th>
          <th>Año</th>
          <th>Total Ventas</th>
          <th>Cantidad de Ventas</th>
          <th>Fecha Generación</th>
          <th>Archivo</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {cierres.map((cierre, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{cierre.mes}</td>
            <td>{cierre.anio}</td>
            <td>{cierre.total}</td>
            <td>{cierre.cantidad}</td>
            <td>{cierre.fecha}</td>
            <td>{cierre.archivo}</td>
            <td><button>Descargar</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaCierres;
