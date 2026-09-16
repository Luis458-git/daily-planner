import { beforeEach, expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from './App'
import { STORAGE_KEY } from './Services/routineService'
beforeEach(() => { jest.useFakeTimers(); jest.setSystemTime(new Date(2026, 8, 16, 7)); localStorage.clear() })
test('integra creación, persistencia, navegación y eliminación confirmada', () => {
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Actividades' }))
  fireEvent.change(screen.getByLabelText('Nombre de la actividad'), { target: { value: 'Prueba integrada' } })
  fireEvent.click(screen.getByRole('button', { name: '+ Guardar actividad' }))
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).activities).toHaveLength(6)
  unmount()
  render(<App />)
  expect(screen.getByRole('heading', { name: /Prueba integrada/ })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Eliminar Prueba integrada' }))
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancelar' }))
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).activities).toHaveLength(6)
  fireEvent.click(screen.getByRole('button', { name: 'Eliminar Prueba integrada' }))
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Eliminar actividad' }))
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).activities).toHaveLength(5)
})
