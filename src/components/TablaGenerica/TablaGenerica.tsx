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

/**
 * Componente genérico reutilizable para mostrar tablas.
 * Admite ordenamiento, renderizado de imágenes y personalización de opciones.
 */
const TablaGenerica: React.FC<TablaGenericaProps> = ({
  columnas,
  datos,
  renderOpciones,
}) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // 🔽 Ordenamiento dinámico
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

      return 0;
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
      sortConfig.direction === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill';
    return <i className={iconClass} style={{ marginLeft: 6 }}></i>;
  };

  const renderCellContent = (key: string, value: any, fila: any) => {
    if (key === "imagen" && value) {
      return (
        <img
          src={value}
          alt={fila.nombre || "imagen"}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
      );
    }
    if (typeof value === "boolean") {
      return value ? "Sí" : "No";
    }
    if (value === null || value === undefined) {
      return "-";
    }
    return value;
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
            {renderOpciones && <th>Opciones</th>}
          </tr>
        </thead>

        <tbody>
          {sortedDatos.length > 0 ? (
            sortedDatos.map((item, idx) => (
              <tr key={idx}>
                {columnas.map(({ key }) => (
                  <td key={key}>{renderCellContent(key, item[key], item)}</td>
                ))}
                {renderOpciones && <td>{renderOpciones(item)}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length + 1} style={{ textAlign: "center", padding: "20px" }}>
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGenerica;