// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AuthTabs   from './pages/AuthTabs';
import SendRemesa from './pages/SendRemesa';
import Dashboard  from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/"            element={<AuthTabs />} />
        <Route path="/send-remesa" element={<SendRemesa />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="*"            element={<AuthTabs />} />
      </Routes>
    </BrowserRouter>
  );
}