import React from 'react'

export default function Filters({ filters, setFilters, categories }){
  function update(field, value){
    setFilters(prev => ({ ...prev, [field]: value }))
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
      <label>
        From
        <input type="date" value={filters.from} onChange={e=>update('from', e.target.value)} />
      </label>
      <label>
        To
        <input type="date" value={filters.to} onChange={e=>update('to', e.target.value)} />
      </label>
      <div className="actions">
        <button onClick={()=>setFilters({ category: 'All', type: 'All', from: '', to: '' })}>Clear</button>
      </div>
    </div>
  )
}
