import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import Statistics from './Statistics'
import { initialData, weekDates } from '../Services/routineService'
test('excluye sesiones de otras semanas del tiempo acumulado', () => {
  render(<Statistics activities={initialData().activities} dates={weekDates(new Date(2026, 8, 16))} sessions={[{ date: '2026-09-16', kind: 'focus', seconds: 1500 }, { date: '2026-09-01', kind: 'focus', seconds: 3600 }]} />)
  expect(screen.getByText('25 min')).toBeInTheDocument()
  expect(screen.queryByText('85 min')).not.toBeInTheDocument()
  expect(screen.getByText('0%')).toBeInTheDocument()
})
