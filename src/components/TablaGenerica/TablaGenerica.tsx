import React, { useState } from 'react';
import "./TablaGenerica.css";

interface Columna {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TablaGenericaProps {
  columnas: Columna[];
  datos: any[];
  renderOpciones?: (fila: any) => React.ReactNode;
  renderCell?: (key: string, value: any, fila: any) => React.ReactNode;
}

const TablaGenerica: React.FC<TablaGenericaProps> = ({
  columnas,
  datos,
  renderOpciones,
  renderCell
}) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const sortedDatos = React.useMemo(() => {
    if (!sortConfig) return datos;

    const sorted = [...datos].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return sorted;
  }, [datos, sortConfig]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;

    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

const getSortIndicator = (key: string) => {
  if (!sortConfig || sortConfig.key !== key) return null;

  const iconClass =
    sortConfig.direction === 'asc' ? ' bi bi-caret-up-fill' : ' bi bi-caret-down-fill';

  return <i className={iconClass}></i>;
};

  return (
    <div className="tabla-contenedor">
      <table className="tabla-generica">
        <thead>
          <tr>
            {columnas.map(({ key, label, sortable }) => (
              <th
                key={key}
                onClick={() => handleSort(key, sortable)}
                style={{ cursor: sortable ? 'pointer' : 'default', userSelect: 'none' }}
                title={sortable ? 'Ordenar' : undefined}
              >
                {label}
                {getSortIndicator(key)}
              </th>
            ))}
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedDatos.map((item, idx) => (
            <tr key={idx}>
              {columnas.map(({ key }) => (
                <td key={key}>
                  {renderCell ? renderCell(key, item[key], item) : item[key]}
                </td>
              ))}
              <td>
                {renderOpciones ? renderOpciones(item) : (
                  <>
                    <span className="icono-opcion" title="Ver" />
                    <span className="icono-opcion" title="Eliminar" />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGenerica;