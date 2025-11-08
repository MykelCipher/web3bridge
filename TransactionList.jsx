import React from 'react'

export default function TransactionList({ transactions, onDelete }){
  if(!transactions.length) return <div className="card">No transactions match the filters.</div>

  return (
    <div className="card list">
      <h2>Transactions ({transactions.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th style={{textAlign:'right'}}>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className={tx.amount>=0? 'income' : 'expense'}>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
              <td>{tx.category}</td>
              <td style={{textAlign:'right'}}>{tx.amount.toFixed(2)}</td>
              <td><button onClick={()=>onDelete(tx.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
