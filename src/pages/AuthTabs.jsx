import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="auth-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Iniciar Sesión
        </button>
        <button
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Registrarse
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'login' ? <Login /> : <Register />}
      </div>

      <style>
        {`
        .tabs {
          display: flex;
          border-bottom: 2px solid #ccc;
          margin-bottom: 1rem;
        }
        .tab {
          flex: 1;
          padding: 0.5rem 1rem;
          cursor: pointer;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-size: 1rem;
        }
        .tab.active {
          border-color: #3490dc;
          font-weight: bold;
        }
        .tab:hover {
          background-color: #f5f5f5;
        }
        `}
      </style>
    </div>
  );
}