import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard({ transactions, allTransactions, categories }){
  const totals = useMemo(()=>{
    const total = allTransactions.reduce((s,t)=>s + t.amount, 0)
    const income = allTransactions.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0)
    const expense = allTransactions.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0)
    return { total, income, expense }
  },[allTransactions])

  const byCategory = useMemo(()=>{
    const map = {}
    categories.forEach(c=>map[c]=0)
    transactions.forEach(t=>{ if(map[t.category] !== undefined) map[t.category] += t.amount; else map[t.category]=t.amount })
    return map
  },[transactions, categories])

  const data = {
    labels: Object.keys(byCategory),
    datasets: [
      {
        label: 'Amount',
        data: Object.values(byCategory).map(v=>Number(v.toFixed(2))),
        backgroundColor: Object.values(byCategory).map(v=> v>=0? 'rgba(75,192,192,0.6)' : 'rgba(255,99,132,0.6)')
      }
    ]
  }

  return (
    <div className="card dashboard">
      <h2>Overview</h2>
      <div className="summary">
        <div>
          <div className="label">Balance</div>
          <div className="value">{totals.total.toFixed(2)}</div>
        </div>
        <div>
          <div className="label">Income</div>
          <div className="value income">{totals.income.toFixed(2)}</div>
        </div>
        <div>
          <div className="label">Expense</div>
          <div className="value expense">{totals.expense.toFixed(2)}</div>
        </div>
      </div>

      <div style={{height: '260px'}}>
        <Bar data={data} options={{ responsive:true, maintainAspectRatio:false }} />
      </div>
    </div>
  )
}
