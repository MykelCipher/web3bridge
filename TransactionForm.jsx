import React, { useState } from 'react'

function uid(){
  return Math.random().toString(36).slice(2,9)
}

export default function TransactionForm({ onAdd, categories }){
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0] || 'Other')

  function submit(e){
    e.preventDefault()
    const num = parseFloat(amount)
    if(!description || Number.isNaN(num)) return alert('Please enter description and numeric amount')

    const tx = { id: uid(), date, description, amount: num, category }
    onAdd(tx)
    setDescription('')
    setAmount('')
    setCategory(categories[0] || 'Other')
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h2>Add transaction</h2>
      <label>
        Date
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </label>
      <label>
        Description
        <input type="text" value={description} onChange={e=>setDescription(e.target.value)} placeholder="e.g., Grocery" />
      </label>
      <label>
        Amount (positive = income, negative = expense)
        <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="e.g., -12.50" />
      </label>
      <label>
        Category
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <div className="actions">
        <button type="submit" className="primary">Add</button>
      </div>
    </form>
  )
}
