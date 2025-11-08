import React, { useEffect, useMemo, useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Filters from './components/Filters'
import Dashboard from './components/Dashboard'
import CategoryManager from './components/CategoryManager'
import { loadTransactions, saveTransactions, loadCategories, saveCategories } from './utils/storage'

const builtinCategories = ['Salary','Food','Rent','Utilities','Entertainment','Other']

export default function App(){
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState(builtinCategories)
  const [filters, setFilters] = useState({ category: 'All', type: 'All', from: '', to: '', minAmount: '', maxAmount: '', sortBy: 'date', sortDir: 'desc' })

  useEffect(()=>{
    const tx = loadTransactions()
    setTransactions(tx)
    const cats = loadCategories()
    if(cats && Array.isArray(cats) && cats.length) setCategories(cats)
  },[])

  useEffect(()=>{
    saveTransactions(transactions)
  },[transactions])

  useEffect(()=>{
    saveCategories(categories)
  },[categories])

  function addTransaction(tx){
    setTransactions(prev => [tx, ...prev])
  }

  function removeTransaction(id){
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  function addCategory(name){
    if(!name) return
    if(categories.includes(name)) return
    setCategories(prev => [...prev, name])
  }

  function removeCategory(name){
    // don't remove builtin categories silently; allow removal but map existing tx to 'Other'
    setCategories(prev => prev.filter(c => c !== name))
    setTransactions(prev => prev.map(t => t.category === name ? { ...t, category: 'Other' } : t))
  }

  const filtered = useMemo(()=>{
    let list = transactions.filter(t => {
      if(filters.category !== 'All' && t.category !== filters.category) return false
      if(filters.type === 'Income' && t.amount <= 0) return false
      if(filters.type === 'Expense' && t.amount >= 0) return false
      if(filters.from && new Date(t.date) < new Date(filters.from)) return false
      if(filters.to && new Date(t.date) > new Date(filters.to)) return false
      if(filters.minAmount !== '' && !Number.isNaN(Number(filters.minAmount)) && t.amount < Number(filters.minAmount)) return false
      if(filters.maxAmount !== '' && !Number.isNaN(Number(filters.maxAmount)) && t.amount > Number(filters.maxAmount)) return false
      return true
    })

    // sorting
    const sortBy = filters.sortBy || 'date'
    const dir = filters.sortDir === 'asc' ? 1 : -1
    list = list.slice().sort((a,b)=>{
      if(sortBy === 'amount') return (a.amount - b.amount) * dir
      // date
      return (new Date(a.date) - new Date(b.date)) * dir
    })

    return list
  },[transactions, filters])

  return (
    <div className="container">
      <header>
        <h1>Personal Finance Tracker</h1>
      </header>
      <main>
        <section className="left">
          <TransactionForm onAdd={addTransaction} categories={categories} />
          <CategoryManager categories={categories} onAdd={addCategory} onRemove={removeCategory} />
          <Filters filters={filters} setFilters={setFilters} categories={categories} />
          <TransactionList transactions={filtered} onDelete={removeTransaction} />
        </section>
        <aside className="right">
          <Dashboard transactions={filtered} allTransactions={transactions} categories={categories} />
        </aside>
      </main>
      <footer>
        <small>Data stored locally in your browser.</small>
      </footer>
    </div>
  )
}
