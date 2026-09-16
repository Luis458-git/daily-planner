import { expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import RoutineItem from './RoutineItem'
import { initialData } from '../Services/routineService'
test('completa en la fecha seleccionada y permite editar o eliminar', () => {
  const activity = initialData().activities[0]
  const onToggle = jest.fn(), onEdit = jest.fn(), onDelete = jest.fn()
  render(<RoutineItem activity={activity} date="2026-09-16" onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} onFocus={jest.fn()} />)
  fireEvent.click(screen.getByRole('checkbox'))
  fireEvent.click(screen.getByRole('button', { name: /Editar/ }))
  fireEvent.click(screen.getByRole('button', { name: /Eliminar/ }))
  expect(onToggle).toHaveBeenCalledWith(activity.id, '2026-09-16')
  expect(onEdit).toHaveBeenCalledWith(activity)
  expect(onDelete).toHaveBeenCalledWith(activity)
})
