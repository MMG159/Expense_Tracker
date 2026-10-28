/** Props: one expense record and its delete callback; the item is stateless. */
function ExpenseItem({ expense, onDelete }) {
  return <article className="expense-item" data-cy="expense-item"><div className="expense-mark" aria-hidden="true">{expense.category.charAt(0)}</div><div className="expense-details"><strong>{expense.title}</strong><span>{expense.category}</span></div><strong className="expense-amount">${Number(expense.amount).toFixed(2)}</strong><button className="delete-button" data-cy="delete-expense" type="button" onClick={() => onDelete(expense.id)} aria-label={`Delete ${expense.title}`}><span aria-hidden="true">×</span></button></article>
}

export default ExpenseItem