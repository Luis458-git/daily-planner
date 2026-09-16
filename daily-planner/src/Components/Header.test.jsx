import { expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
test('solicita notificaciones solo al pulsar el control', () => {
  const request = jest.fn()
  render(<Header onMenu={jest.fn()} permission="default" onNotifications={request} storageError="" />)
  expect(request).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: /Activar notificaciones/ }))
  expect(request).toHaveBeenCalledTimes(1)
})
