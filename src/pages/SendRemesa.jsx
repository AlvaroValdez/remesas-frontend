// src/pages/SendRemesa.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectorAsset from '../components/SelectorAsset';
import { assetsList } from '../utils/assets';

export default function SendRemesa() {
  const [monto, setMonto] = useState('');
  const [moneda, setMoneda] = useState('USD');
  const [destino, setDestino] = useState('');
  const [memo, setMemo] = useState('');
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // URL base de la API (asegúrate de definir VITE_API_URL en .env)
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatus('queued');

    try {
      const { data } = await axios.post(
        `${API}/api/remesas`,
        {
          monto: Number(monto),
          moneda_origen: moneda,
          cuenta_destino: destino,
          memo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobId(data.jobId);
    } catch (err) {
      console.error(err);
      setError('Error al encolar la remesa. Intenta nuevamente.');
      setStatus(null);
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const iv = setInterval(async () => {
      try {
        const { data } = await axios.get(`${API}/api/remesas/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStatus(data.state);
        if (data.state === 'completed' || data.state === 'failed') {
          setResult(data.result);
          clearInterval(iv);
        }
      } catch (err) {
        console.error(err);
        setError('Error al verificar estado de la transacción.');
        clearInterval(iv);
      }
    }, 2000);

    return () => clearInterval(iv);
  }, [jobId]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Enviar Remesa</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {!jobId ? (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          {/* Campo: Monto */}
          <div className="mb-3">
            <label className="form-label">Monto</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa el monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
            />
          </div>

          {/* Selector de Asset */}
          <SelectorAsset
            asset={moneda}
            onAssetChange={setMoneda}
            assets={assetsList}
            label="Moneda / Asset"
          />

          {/* Cuenta de destino */}
          <div className="mb-3">
            <label className="form-label">Cuenta de destino</label>
            <input
              type="text"
              className="form-control"
              placeholder="Inserta la cuenta o cartera de destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              required
            />
          </div>

          {/* Memo (opcional) */}
          <div className="mb-3">
            <label className="form-label">Memo (opcional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Descripción o referencia"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          {/* Botón de envío */}
          <button type="submit" className="btn btn-primary w-100">
            Enviar Remesa
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <h5>
            Estado:{' '}
            <span className="badge bg-info text-dark">{status}</span>
          </h5>

          {status === 'completed' && (
            <div className="alert alert-success mt-3">
              <strong>Transacción completada:</strong>
              <pre className="mt-2">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          {status === 'failed' && (
            <div className="alert alert-danger mt-3">
              <strong>Transacción fallida:</strong>
              <pre className="mt-2">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}