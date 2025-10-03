// src/components/TablaGenerica/TablaGenerica.tsx
import React from 'react';
import './TablaGenerica.css';

type Props = {
  columnas: string[]; // Encabezados de la tabla
  datos: any[]; // Datos de la tabla (array de objetos)
  botones: boolean; // Si muestra los botones de ver y descargar
};

const TablaGenerica = ({ columnas, datos, botones }: Props) => {
  return (
    <div className="tabla-generica">
      <table>
        <thead>
          <tr>
            {columnas.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((dato, index) => (
            <tr key={index}>
              {columnas.map((col, idx) => (
                <td key={idx}>{dato[col]}</td>
              ))}
              {botones && (
                <td>
                  <button className="btn-ver">👁️ Ver</button>
                  <button className="btn-descargar">⬇ Descargar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGenerica;
