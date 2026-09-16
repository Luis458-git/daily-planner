import { expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from './Dashboard'
import { initialData } from '../Services/routineService'
test('permite abrir actividades y muestra el progreso diario', () => {
  const data = initialData()
  const navigate = jest.fn()
  render(<Dashboard data={data} today="2026-09-16" todaysActivities={data.activities} timer={{ kind: 'focus', total: 1500, remaining: 1500, activityId: '' }} actions={{}} navigate={navigate} />)
  fireEvent.click(screen.getByRole('button', { name: '+ Añadir' }))
  expect(navigate).toHaveBeenCalledWith('activities')
  expect(screen.getByRole('progressbar')).toHaveAttribute('value', '0')
})
