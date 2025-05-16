// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import SendRemesa from './pages/SendRemesa';
import Dashboard from './pages/Dashboard'; // crea un placeholder

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send-remesa" element={<SendRemesa />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}