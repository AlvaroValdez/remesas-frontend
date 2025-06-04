// src/components/NavBar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login'); };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src="src/img/logo_ok.png" alt="Logo" height="30"/>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          {token && (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/send-remesa">Enviar Remesa</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Historial</NavLink>
              </li>
            </ul>
          )}
          {token ? (
            <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar Sesión</button>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Registrarse</NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}