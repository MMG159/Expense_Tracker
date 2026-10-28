import { calculateTotal, filterExpenses, validateExpense, MAX_AMOUNT } from './expenses'

describe('expense utilities', () => {
  it('accepts a valid expense', () => expect(validateExpense({ title: 'Lunch', amount: '25', category: 'Food' })).toBe(''))
  it('rejects an empty title', () => expect(validateExpense({ title: '  ', amount: '25', category: 'Food' })).toMatch(/title/i))
  it('rejects a non-numeric amount', () => expect(validateExpense({ title: 'Lunch', amount: 'abc', category: 'Food' })).toMatch(/valid amount/i))
  it('rejects a zero amount', () => expect(validateExpense({ title: 'Lunch', amount: '0', category: 'Food' })).toMatch(/greater than zero/i))
  it('rejects a negative amount', () => expect(validateExpense({ title: 'Lunch', amount: '-1', category: 'Food' })).toMatch(/greater than zero/i))
  it('rejects amounts over the limit', () => expect(validateExpense({ title: 'Car', amount: String(MAX_AMOUNT + 1), category: 'Bills' })).toMatch(/100,000/i))
  it('calculates a running total', () => expect(calculateTotal([{ amount: 12.5 }, { amount: '7.50' }])).toBe(20))
  it('filters expenses by category and returns all for All', () => {
    const expenses = [{ category: 'Food' }, { category: 'Travel' }]
    expect(filterExpenses(expenses, 'Food')).toEqual([expenses[0]])
    expect(filterExpenses(expenses, 'All')).toEqual(expenses)
  })
})
