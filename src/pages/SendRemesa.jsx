import React, { useState } from 'react'
import axios from 'axios'

export default function SendRemesa() {
  const [monto, setMonto] = useState('')
  const [cuentaDestino, setCuentaDestino] = useState('')
  const [memo, setMemo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)

    try {
      const payload = {
        monto: Number(monto),
        moneda: 'CLP',
        destino: 'BOB',
        cuenta_destino: cuentaDestino
      }

      const { data } = await axios.post(
        `${API_URL}/api/remesas`,
        payload
      )

      setResult(data)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="send-remesa-container">
      <form className="send-remesa-form" onSubmit={handleSubmit}>
        <label>
          Estás enviando (CLP):
          <input
            type="number"
            value={monto}
            onChange={e => setMonto(e.target.value)}
            placeholder="0"
            required
          />
        </label>

        <label>
          Cuenta destino (BOB):
          <input
            type="text"
            value={cuentaDestino}
            onChange={e => setCuentaDestino(e.target.value)}
            placeholder="12345678"
            required
          />
        </label>
        <label>
          Memo (descripcion):
          <input
            type="text"
            value={memo}
            onChange={e => setMemo(e.target.value)}
            placeholder="Escribe tu mensaje"
            required
          />
        </label>
        <button type="submit" disabled={loading || !monto || !cuentaDestino}>
          {loading ? 'Enviando…' : 'Enviar remesa'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {result && (
        <div className="result-message">
          <h3>✅ Remesa enviada con éxito</h3>
          <p><strong>Hash transacción:</strong> {result.tx_hash}</p>
          <p><strong>Comisión aplicada:</strong> {result.commission.toLocaleString()} CLP</p>
          <p><strong>ID Anchor:</strong> {result.anchor_id}</p>
        </div>
      )}
    </div>
  )
}