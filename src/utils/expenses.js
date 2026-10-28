export const MAX_AMOUNT = 100000

export function validateExpense({ title, amount, category }) {
  const numericAmount = Number(amount)
  if (!title.trim()) return 'Enter a title.'
  if (amount === '' || !Number.isFinite(numericAmount)) return 'Enter a valid amount.'
  if (numericAmount <= 0) return 'Amount must be greater than zero.'
  if (numericAmount > MAX_AMOUNT) return 'Amount must be $100,000 or less.'
  if (!category) return 'Choose a category.'
  return ''
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + Number(expense.amount), 0)
}

export function filterExpenses(expenses, category) {
  return category === 'All' ? expenses : expenses.filter((expense) => expense.category === category)
}