import { expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import Weekly from './Weekly'
import { initialData, weekDates } from '../Services/routineService'
test('selecciona un día y permite editar un bloque semanal', () => {
  const select = jest.fn(), edit = jest.fn()
  render(<Weekly activities={initialData().activities} dates={weekDates(new Date(2026, 8, 16))} selectedDay={2} setSelectedDay={select} actions={{ onEdit: edit }} />)
  fireEvent.click(screen.getByRole('button', { name: /Domingo/ }))
  expect(select).toHaveBeenCalledWith(6)
  fireEvent.click(screen.getAllByRole('button', { name: /09:00.*Programación Frontend/ })[0])
  expect(edit).toHaveBeenCalledWith(expect.objectContaining({ title: 'Programación Frontend' }))
})
