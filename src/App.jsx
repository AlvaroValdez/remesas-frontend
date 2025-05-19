// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthTabs     from './pages/AuthTabs';
import Dashboard    from './pages/Dashboard';
import SendRemesa   from './pages/SendRemesa';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<AuthTabs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send-remesa" element={<SendRemesa />} />
      </Routes>
    </BrowserRouter>
  );
}