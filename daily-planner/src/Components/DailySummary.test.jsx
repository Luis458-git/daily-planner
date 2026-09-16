import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import DailySummary from './DailySummary'
import { initialData } from '../Services/routineService'
test('cuenta completadas y tiempo solo de la fecha solicitada', () => {
  const activity = { ...initialData().activities[0], completedDates: ['2026-09-16'] }
  render(<DailySummary activities={[activity]} date="2026-09-16" sessions={[{ date: '2026-09-16', kind: 'focus', seconds: 1500 }, { date: '2026-09-15', kind: 'focus', seconds: 600 }]} />)
  expect(screen.getByText('1 / 1')).toBeInTheDocument()
  expect(screen.getByText('25 min')).toBeInTheDocument()
})
