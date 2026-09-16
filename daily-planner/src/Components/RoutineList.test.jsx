import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import RoutineList from './RoutineList'
import { initialData } from '../Services/routineService'
test('ordena los bloques por hora', () => {
  render(<RoutineList activities={[...initialData().activities].reverse()} date="2026-09-16" />)
  expect(screen.getAllByRole('heading', { level: 3 })[0]).toHaveTextContent('Programación Frontend')
})
test('muestra un estado vacío', () => { render(<RoutineList activities={[]} />); expect(screen.getByText('Espacio para un nuevo plan')).toBeInTheDocument() })
