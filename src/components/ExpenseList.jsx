import ExpenseItem from './ExpenseItem'

/** Props: visible expenses and the delete callback; no local state is needed. */
function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) return <p className="empty-state" data-cy="empty-state">No expenses in this view yet.</p>
  return <div className="expense-list" data-cy="expense-list">{expenses.map((expense) => <ExpenseItem key={expense.id} expense={expense} onDelete={onDeleteExpense} />)}</div>
}

export default ExpenseList