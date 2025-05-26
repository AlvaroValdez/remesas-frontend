// src/pages/SendRemesa.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SendRemesa() {
  const [monto, setMonto] = useState('');
  const [destino, setDestino] = useState('');
  const [memo, setMemo] = useState('');
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const handleSubmit = async e => { e.preventDefault(); setError(null); setStatus('queued');
    try {
      const { data } = await axios.post(
        `${API}/api/remesas`, { monto:Number(monto), cuenta_destino:destino, memo },
        { headers:{ Authorization:`Bearer ${token}` } }
      );
      setJobId(data.jobId);
    } catch (err) { setError('Error al encolar'); setStatus(null);}    
  };

  useEffect(() => {
    if (!jobId) return;
    const iv = setInterval(async () => {
      try {
        const { data } = await axios.get(`${API}/api/remesas/${jobId}`, { headers:{Authorization:`Bearer ${token}`}});
        setStatus(data.state);
        if (data.state==='completed'||data.state==='failed') { setResult(data.result); clearInterval(iv);}  
      } catch { setError('Error al checar estado'); clearInterval(iv);}    
    },2000);
    return () => clearInterval(iv);
  }, [jobId]);

  return (
    <div>
      {!jobId ? (
        <form onSubmit={handleSubmit} className="mb-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Monto (CLP)</label>
            <input type="number" className="form-control" value={monto} onChange={e=>setMonto(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Cuenta destino</label>
            <input type="text" className="form-control" value={destino} onChange={e=>setDestino(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Memo</label>
            <input type="text" className="form-control" value={memo} onChange={e=>setMemo(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={status==='queued'||status==='waiting'}>
            {status==='queued'||status==='waiting' ? 'Procesando…' : 'Enviar Remesa'}
          </button>
        </form>
      ) : (
        <div>
          <h4>Estado: {status}</h4>
          {status==='completed'&&result&&(
            <div className="alert alert-success">
              <p><strong>Hash:</strong> {result.tx_hash}</p>
              <p><strong>Comisión:</strong> {result.commission.toLocaleString()} CLP</p>
              <p><strong>Anchor ID:</strong> {result.anchor_id}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}