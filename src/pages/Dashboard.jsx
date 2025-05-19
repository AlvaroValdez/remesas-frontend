// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [remesas, setRemesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const token   = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // Si no está autenticado, redirige a login
      return navigate('/login');
    }
    async function fetchRemesas() {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/remesas`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRemesas(data);
      } catch (err) {
        console.error('Error al cargar historial:', err);
        setError(err.response?.data?.error || 'No se pudo cargar historial');
      } finally {
        setLoading(false);
      }
    }
    fetchRemesas();
  }, [API_URL, token, navigate]);

  if (loading) return <p>Cargando historial…</p>;
  if (error)   return <p>❌ {error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Historial de Remesas</h2>
      {remesas.length === 0 ? (
        <p>No tienes remesas registradas aún.</p>
      ) : (
        <table className="remesas-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Comisión</th>
              <th>Hash</th>
              <th>Anchor ID</th>
            </tr>
          </thead>
          <tbody>
            {remesas.map(r => (
              <tr key={r.id}>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.monto.toLocaleString()} CLP</td>
                <td>{r.commission.toLocaleString()} CLP</td>
                <td className="tx-hash">{r.txHash}</td>
                <td>{r.anchorId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}