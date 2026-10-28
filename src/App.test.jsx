import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

let id = 0
beforeEach(() => {
  id = 0
  vi.stubGlobal('crypto', { randomUUID: () => `expense-${id++}` })
})

function getByCy(name) {
  return document.querySelector(`[data-cy="${name}"]`)
}

async function addExpense(user, title, amount, category = 'Food') {
  await user.type(getByCy('title'), title)
  await user.type(getByCy('amount'), amount)
  await user.selectOptions(getByCy('category'), category)
  await user.click(getByCy('add-expense'))
}

describe('expense tracker', () => {
  it('adds a valid expense and formats the total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Lunch', '25')
    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(getByCy('total')).toHaveTextContent('$25.00')
    expect(getByCy('count')).toHaveTextContent('1 expense')
  })

  it('rejects an empty title without adding a row', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(getByCy('amount'), '10')
    await user.click(getByCy('add-expense'))
    expect(screen.getByRole('alert')).toHaveTextContent('title')
    expect(document.querySelectorAll('[data-cy="expense-item"]')).toHaveLength(0)
  })

  it('rejects negative amounts in the form', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Refund', '-4')
    expect(screen.getByRole('alert')).toHaveTextContent('greater than zero')
    expect(document.querySelectorAll('[data-cy="expense-item"]')).toHaveLength(0)
  })

  it('filters visible rows and total by category', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Lunch', '25', 'Food')
    await addExpense(user, 'Cab', '40', 'Travel')
    await user.selectOptions(getByCy('filter'), 'Food')
    expect(getByCy('expense-item')).toHaveTextContent('Lunch')
    expect(screen.queryByText('Cab')).not.toBeInTheDocument()
    expect(getByCy('total')).toHaveTextContent('$25.00')
    expect(getByCy('count')).toHaveTextContent('1 expense')
  })

  it('deletes an expense and updates count and total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Lunch', '25')
    await user.click(getByCy('delete-expense'))
    expect(document.querySelectorAll('[data-cy="expense-item"]')).toHaveLength(0)
    expect(getByCy('total')).toHaveTextContent('$0.00')
    expect(getByCy('count')).toHaveTextContent('0 expenses')
  })
})
