import React from 'react'
import SendRemesa from './pages/SendRemesa'
import './styles.css'

export default function App() {
  return (
    <div className="app-container">
      <h1>Enviar remesa Stellar</h1>
      <SendRemesa />
    </div>
  )
}