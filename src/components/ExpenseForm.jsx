import { useState } from 'react'
import { validateExpense } from '../utils/expenses'

/** Props: category options and an onAddExpense callback; local state holds form fields and validation feedback. */
function ExpenseForm({ categories, onAddExpense }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateExpense({ title, amount, category })
    if (validationError) { setError(validationError); return }
    onAddExpense({ title: title.trim(), amount: Number(amount), category })
    setTitle(''); setAmount(''); setError('')
  }

  return (
    <section className="form-panel" aria-labelledby="add-heading">
      <p className="eyebrow">New entry</p><h2 id="add-heading">Add an expense</h2>
      <p className="panel-copy">Capture the details while they are still fresh.</p>
      <form onSubmit={handleSubmit} noValidate>
        <label>Title<input data-cy="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Morning coffee" autoComplete="off" /></label>
        <label>Amount<div className="amount-input"><span>$</span><input data-cy="amount" type="number" min="0.01" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" inputMode="decimal" /></div></label>
        <label>Category<select data-cy="category" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((option) => <option key={option}>{option}</option>)}</select></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" data-cy="add-expense" type="submit">Add expense <span aria-hidden="true">+</span></button>
      </form>
    </section>
  )
}

export default ExpenseForm