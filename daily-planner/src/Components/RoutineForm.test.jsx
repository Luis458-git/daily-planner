import { expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import RoutineForm from './RoutineForm'
import { initialData } from '../Services/routineService'
test('envía una actividad válida y recorta el título', () => {
  const save = jest.fn()
  render(<RoutineForm onSave={save} onCancel={jest.fn()} />)
  fireEvent.change(screen.getByLabelText('Nombre de la actividad'), { target: { value: '  Estudiar React  ' } })
  fireEvent.click(screen.getByRole('button', { name: '+ Guardar actividad' }))
  expect(save).toHaveBeenCalledWith(expect.objectContaining({ title: 'Estudiar React', days: [0, 1, 2, 3, 4] }))
})
test('rechaza horarios invertidos y conserva los datos al editar', () => {
  const save = jest.fn()
  render(<RoutineForm activity={initialData().activities[0]} onSave={save} onCancel={jest.fn()} />)
  fireEvent.change(screen.getByLabelText('Hora final'), { target: { value: '08:00' } })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))
  expect(screen.getByRole('alert')).toHaveTextContent('posterior')
  expect(save).not.toHaveBeenCalled()
})
