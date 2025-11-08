import React from 'react'

export default function Filters({ filters, setFilters, categories }){
  function update(field, value){
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  function clear(){
    setFilters({ category: 'All', type: 'All', from: '', to: '', minAmount: '', maxAmount: '', sortBy: 'date', sortDir: 'desc' })
  }

  return (
    <div className="card filters">
      <h2>Filters</h2>
      <label>
        Category
        <select value={filters.category} onChange={e=>update('category', e.target.value)}>
          <option value="All">All</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label>
        Type
        <select value={filters.type} onChange={e=>update('type', e.target.value)}>
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </label>

      <div style={{display:'flex',gap:8}}>
        <label style={{flex:1}}>
          Min amount
          <input type="number" step="0.01" value={filters.minAmount} onChange={e=>update('minAmount', e.target.value)} placeholder="e.g., -100" />
        </label>
        <label style={{flex:1}}>
          Max amount
          <input type="number" step="0.01" value={filters.maxAmount} onChange={e=>update('maxAmount', e.target.value)} placeholder="e.g., 1000" />
        </label>
      </div>

      <label>
        From
        <input type="date" value={filters.from} onChange={e=>update('from', e.target.value)} />
      </label>
      <label>
        To
        <input type="date" value={filters.to} onChange={e=>update('to', e.target.value)} />
      </label>

      <label>
        Sort by
        <select value={filters.sortBy} onChange={e=>update('sortBy', e.target.value)}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </label>
      <label>
        Direction
        <select value={filters.sortDir} onChange={e=>update('sortDir', e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>

      <div className="actions">
        <button onClick={clear}>Clear</button>
      </div>
    </div>
  )
}
