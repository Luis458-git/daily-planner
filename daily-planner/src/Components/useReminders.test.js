import { useState } from 'react'
import { beforeEach, afterEach, expect, jest, test } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import useReminders from './useReminders'
import { initialData } from '../Services/routineService'
const original = Object.getOwnPropertyDescriptor(window, 'Notification')
let notification
beforeEach(() => {
  jest.useFakeTimers(); jest.setSystemTime(new Date(2026, 8, 16, 8, 50))
  notification = jest.fn()
  notification.permission = 'granted'
  notification.requestPermission = jest.fn().mockResolvedValue('denied')
  Object.defineProperty(window, 'Notification', { configurable: true, writable: true, value: notification })
})
afterEach(() => { if (original) Object.defineProperty(window, 'Notification', original); else delete window.Notification })
function useHarness(initialNotices = []) {
  const [data, setData] = useState(() => ({ activities: [initialData().activities[0]], notices: initialNotices }))
  return { ...useReminders(data.activities, data.notices, setData), data }
}
test('entrega una vez y evita duplicar al montar de nuevo', () => {
  const first = renderHook(() => useHarness())
  expect(first.result.current.active).toHaveLength(1)
  act(() => jest.advanceTimersByTime(3000))
  expect(notification).toHaveBeenCalledTimes(1)
  expect(notification).toHaveBeenCalledWith('Programación Frontend', expect.objectContaining({ body: expect.stringContaining('09:00') }))
  const notices = first.result.current.data.notices
  first.unmount()
  renderHook(() => useHarness(notices))
  expect(notification).toHaveBeenCalledTimes(1)
})
test.each([5, 10])('pospone %i minutos y permite descartar', minutes => {
  const { result } = renderHook(() => useHarness())
  const id = result.current.active[0].id
  act(() => result.current.snooze(id, minutes))
  expect(result.current.active).toHaveLength(0)
  act(() => jest.advanceTimersByTime(minutes * 60000 - 1000))
  expect(result.current.active).toHaveLength(0)
  act(() => jest.advanceTimersByTime(1000))
  expect(result.current.active).toHaveLength(1)
  act(() => result.current.dismiss(id))
  expect(result.current.active).toHaveLength(0)
})
test('trata permiso rechazado sin perder el aviso interno', async () => {
  notification.permission = 'denied'
  const { result } = renderHook(() => useHarness())
  await act(() => result.current.requestPermission())
  expect(result.current.permission).toBe('denied')
  expect(result.current.active).toHaveLength(1)
  expect(notification).not.toHaveBeenCalled()
})
test('funciona sin Notification API y limpia el intervalo', () => {
  delete window.Notification
  const { result, unmount } = renderHook(() => useHarness())
  expect(result.current.permission).toBe('unsupported')
  expect(result.current.active).toHaveLength(1)
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})
