import React, { useState } from 'react'

export default function SendRemesa() {
  const [amount, setAmount] = useState('')
  const [destCurrency, setDestCurrency] = useState('BOB')

  return (
    <form className="send-remesa-form">
      <label>
        Estás enviando
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0.00"
        />
        CLP
      </label>

      <label>
        Destinatario recibe
        <input readOnly value={/* cálculo */ ''} placeholder="0.00" />
        {destCurrency}
      </label>

      <button type="submit">Continuar</button>
    </form>
  )
}