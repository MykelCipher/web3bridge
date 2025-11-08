import React, { useEffect, useMemo, useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Filters from './components/Filters'
import Dashboard from './components/Dashboard'
import { loadTransactions, saveTransactions } from './utils/storage'

const defaultCategories = ['Salary','Food','Rent','Utilities','Entertainment','Other']

export default function App(){
  const [transactions, setTransactions] = useState([])
  const [filters, setFilters] = useState({ category: 'All', type: 'All', from: '', to: '' })

  useEffect(()=>{
    const tx = loadTransactions()
    setTransactions(tx)
  },[])

  useEffect(()=>{
    saveTransactions(transactions)
  },[transactions])

  function addTransaction(tx){
    setTransactions(prev => [tx, ...prev])
  }

  function removeTransaction(id){
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const filtered = useMemo(()=>{
    return transactions.filter(t => {
      if(filters.category !== 'All' && t.category !== filters.category) return false
      if(filters.type === 'Income' && t.amount <= 0) return false
      if(filters.type === 'Expense' && t.amount >= 0) return false
      if(filters.from && new Date(t.date) < new Date(filters.from)) return false
      if(filters.to && new Date(t.date) > new Date(filters.to)) return false
      return true
    })
  },[transactions, filters])

  return (
    <div className="container">
      <header>
        <h1>Personal Finance Tracker</h1>
      </header>
      <main>
        <section className="left">
          <TransactionForm onAdd={addTransaction} categories={defaultCategories} />
          <Filters filters={filters} setFilters={setFilters} categories={defaultCategories} />
          <TransactionList transactions={filtered} onDelete={removeTransaction} />
        </section>
        <aside className="right">
          <Dashboard transactions={filtered} allTransactions={transactions} categories={defaultCategories} />
        </aside>
      </main>
      <footer>
        <small>Data stored locally in your browser.</small>
      </footer>
    </div>
  )
}
