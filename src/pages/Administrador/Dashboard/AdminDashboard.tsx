import React from "react";

type CardProps = {
  title: string;
  value: string | number;
};

const Card: React.FC<CardProps> = ({ title, value }) => (
  <div style={{
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    flex: 1,
    margin: '10px'
  }}>
    <h3>{title}</h3>
    <p style={{fontSize: '1.8rem', fontWeight: 'bold'}}>{value}</p>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <main style={{ padding: 20, backgroundColor: '#f0f2f5', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', marginBottom: 20 }}>
            <Card title="Usuarios Activos" value={1245} />
            <Card title="Ventas Hoy" value="$3,450" />
            <Card title="Productos" value={540} />
          </div>

          <section style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h2>Últimas Actividades</h2>
            <ul>
              <li>JuanP creó un nuevo pedido.</li>
              <li>Producto "Collar para perro" actualizado.</li>
              <li>Reporte mensual descargado.</li>
              <li>MariaL cambió su contraseña.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
