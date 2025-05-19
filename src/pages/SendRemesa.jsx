import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SendRemesa() {
  const [monto, setMonto] = useState('');
  const [destino, setDestino] = useState('');
  const [memo, setMemo] = useState('');
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('queued');
    setResult(null);
    const { data } = await axios.post(
      `${API}/api/remesas`,
      { monto: Number(monto), cuenta_destino: destino, memo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setJobId(data.jobId);
  };

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      const { data } = await axios.get(
        `${API}/api/remesas/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus(data.state);
      if (data.state === 'completed' || data.state === 'failed') {
        setResult(data.result);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId, API, token]);

  return (
    <div>
      {!jobId ? (
        <form onSubmit={handleSubmit}>
          <label>Monto (CLP):</label>
          <input type="number" value={monto} onChange={e => setMonto(e.target.value)} required />
          <label>Cuenta destino (Stellar):</label>
          <input type="text" value={destino} onChange={e => setDestino(e.target.value)} required />
          <label>Memo (opcional):</label>
          <input type="text" value={memo} onChange={e => setMemo(e.target.value)} />
          <button type="submit">Enviar remesa</button>
        </form>
      ) : (
        <div>
          <p>Estado: {status}</p>
          {status === 'completed' && result && (
            <div>
              <h3>✅ Remesa completada</h3>
              <p>Hash: {result.tx_hash}</p>
              <p>Comisión: {result.commission.toLocaleString()} CLP</p>
              <p>Anchor ID: {result.anchor_id}</p>
            </div>
          )}
          {status === 'failed' && <p>❌ Falló el procesamiento de la remesa.</p>}
        </div>
      )}
    </div>
  );
}