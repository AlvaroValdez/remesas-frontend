// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [remesas, setRemesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${API}/api/remesas`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setRemesas(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando…</p>;
  return (
    <div>
      <h2 className="mb-4 text-dark">Historial de Remesas</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr><th>Fecha</th><th>Monto</th><th>Comisión</th><th>Hash</th><th>Anchor ID</th></tr>
        </thead>
        <tbody>
          {remesas.map(r => (
            <tr key={r.id}>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>{r.monto.toLocaleString()} CLP</td>
              <td>{r.commission.toLocaleString()} CLP</td>
              <td>{r.txHash}</td>
              <td>{r.anchorId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}