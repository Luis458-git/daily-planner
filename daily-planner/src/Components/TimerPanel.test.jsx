import { expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import TimerPanel from './TimerPanel'
const timer = () => ({ kind: 'focus', remaining: 1500, total: 1500, running: false, locked: false, activityId: '', choose: jest.fn(), toggle: jest.fn(), finish: jest.fn(), addTime: jest.fn(), selectActivity: jest.fn() })
test('muestra el tiempo y conecta los controles', () => {
  const value = timer()
  render(<TimerPanel timer={value} activities={[]} />)
  expect(screen.getByRole('timer')).toHaveTextContent('25:00')
  fireEvent.click(screen.getByRole('button', { name: '▷ Iniciar' }))
  fireEvent.click(screen.getByRole('button', { name: '+5 min' }))
  fireEvent.click(screen.getByRole('button', { name: 'Finalizar' }))
  expect(value.toggle).toHaveBeenCalledTimes(1)
  expect(value.addTime).toHaveBeenCalledTimes(1)
  expect(value.finish).toHaveBeenCalledTimes(1)
})
test('impide cambiar el modo y la actividad durante una sesión', () => {
  render(<TimerPanel timer={{ ...timer(), locked: true, running: true }} activities={[]} />)
  expect(screen.getByRole('combobox')).toBeDisabled()
  expect(screen.getByRole('button', { name: '45 min' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Ⅱ Pausar' })).toBeEnabled()
})
