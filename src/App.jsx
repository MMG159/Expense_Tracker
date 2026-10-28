import { useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import CategoryFilter from './components/CategoryFilter'
import { calculateTotal, filterExpenses } from './utils/expenses'
import './App.css'

const categories = ['Food', 'Travel', 'Bills', 'Other']

function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const visibleExpenses = useMemo(() => filterExpenses(expenses, selectedCategory), [expenses, selectedCategory])
  const total = calculateTotal(visibleExpenses)

  function addExpense(expense) {
    setExpenses((currentExpenses) => [...currentExpenses, { ...expense, id: crypto.randomUUID() }])
  }

  function deleteExpense(id) {
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id))
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal finance / 2026</p>
          <h1>Expense tracker</h1>
          <p className="subtitle">A clear view of where your money is moving.</p>
        </div>
        <div className="total-panel" data-cy="total"><span>Visible total</span><strong>${total.toFixed(2)}</strong></div>
      </header>
      <section className="workspace" aria-label="Expense tracker workspace">
        <ExpenseForm categories={categories} onAddExpense={addExpense} />
        <section className="ledger-panel" aria-labelledby="ledger-heading">
          <div className="ledger-heading">
            <div><p className="eyebrow">Activity ledger</p><h2 id="ledger-heading">Your expenses</h2></div>
            <span className="count-badge" data-cy="count">{visibleExpenses.length} {visibleExpenses.length === 1 ? 'expense' : 'expenses'}</span>
          </div>
          <CategoryFilter categories={categories} value={selectedCategory} onChange={setSelectedCategory} />
          <ExpenseList expenses={visibleExpenses} onDeleteExpense={deleteExpense} />
        </section>
      </section>
    </main>
  )
}

export default App
