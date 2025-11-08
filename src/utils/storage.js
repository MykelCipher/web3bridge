const KEY_TX = 'pft_transactions_v1'
const KEY_CAT = 'pft_categories_v1'

export function loadTransactions(){
  try{
    const raw = localStorage.getItem(KEY_TX)
    if(!raw) return []
    return JSON.parse(raw)
  }catch(e){
    console.error('Failed to load transactions', e)
    return []
  }
}

export function saveTransactions(list){
  try{
    localStorage.setItem(KEY_TX, JSON.stringify(list))
  }catch(e){
    console.error('Failed to save transactions', e)
  }
}

export function loadCategories(){
  try{
    const raw = localStorage.getItem(KEY_CAT)
    if(!raw) return null
    return JSON.parse(raw)
  }catch(e){
    console.error('Failed to load categories', e)
    return null
  }
}

export function saveCategories(list){
  try{
    localStorage.setItem(KEY_CAT, JSON.stringify(list))
  }catch(e){
    console.error('Failed to save categories', e)
  }
}
