// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        { email, password }
      );

      // Guarda el JWT y la Stellar publicKey en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('publicKey', data.publicKey);

      // Redirige al dashboard o a la pantalla de envío de remesas
      navigate('/dashboard');
    } catch (err) {
      console.error('Registro error:', err);
      const msg = err.response?.data?.error || err.message || 'Error en registro';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear una cuenta</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando…' : 'Registrar'}
        </button>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
      </form>
    </div>
  );
}