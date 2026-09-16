import { expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from './Sidebar'
test('indica la página actual y permite navegar', () => {
  const navigate = jest.fn()
  render(<Sidebar page="dashboard" navigate={navigate} open={true} percent={50} />)
  expect(screen.getByRole('button', { name: /Dashboard/ })).toHaveAttribute('aria-current', 'page')
  fireEvent.click(screen.getByRole('button', { name: /Rutina semanal/ }))
  expect(navigate).toHaveBeenCalledWith('week')
  expect(screen.getByRole('progressbar')).toHaveAttribute('value', '50')
})
