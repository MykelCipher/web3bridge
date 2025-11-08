import React, { useState } from 'react'

export default function CategoryManager({ categories, onAdd, onRemove }){
  const [name, setName] = useState('')

  function submit(e){
    e.preventDefault()
    const v = name.trim()
    if(!v) return
    onAdd(v)
    setName('')
  }

  return (
    <div className="card">
      <h2>Categories</h2>
      <form onSubmit={submit} style={{display:'flex',gap:8}}>
        <input placeholder="New category" value={name} onChange={e=>setName(e.target.value)} />
        <button type="submit" className="primary">Add</button>
      </form>
      <div style={{marginTop:8}}>
        {categories.map(c=> (
          <div key={c} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0'}}>
            <div>{c}</div>
            <div><button onClick={()=>onRemove(c)} aria-label={`Remove ${c}`}>Remove</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
