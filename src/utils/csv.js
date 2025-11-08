export function exportCSV(transactions, filename = 'transactions.csv'){
  if(!transactions || !transactions.length) return
  const header = ['id','date','description','category','amount']
  const rows = transactions.map(t => [t.id, t.date, `"${(t.description||'').replace(/"/g,'""')}"`, t.category, t.amount])
  const csv = [header.join(','), ...rows.map(r=>r.join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
