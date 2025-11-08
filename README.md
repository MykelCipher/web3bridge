# Personal Finance Tracker (Vite + React)

A small single-page app to track income and expenses locally in the browser. Built with Vite + React (JavaScript).

## Features

- Add transactions (date, notes, amount, category)
- Create and manage custom categories
- Sorting and filtering (category, type, date range, amount range, sort by date/amount)
- LocalStorage persistence
- Summary totals and bar chart by category (Chart.js)
- CSV export of transactions

## Setup (Windows PowerShell)

Install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

Notes: Data is stored in your browser's localStorage under the key `pft_transactions_v1` (transactions) and `pft_categories_v1` (categories).
