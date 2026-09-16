import { expect, jest, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import Activities from './Activities'
import { initialData } from '../Services/routineService'
test('combina búsqueda por nombre y filtro de día', () => {
  const props = { activities: initialData().activities, formKey: 0, onSave: jest.fn(), onCancel: jest.fn(), actions: {}, setFilter: jest.fn(), setQuery: jest.fn(), date: '2026-09-20' }
  const { rerender } = render(<Activities {...props} filter="6" query="lectura" />)
  expect(screen.getByRole('heading', { name: /Lectura personal/ })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: /Programación Frontend/ })).not.toBeInTheDocument()
  rerender(<Activities {...props} filter="6" query="programación" />)
  expect(screen.getByText('Espacio para un nuevo plan')).toBeInTheDocument()
})
