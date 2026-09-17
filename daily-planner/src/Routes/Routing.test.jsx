import { beforeEach, expect, jest, test } from '@jest/globals'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Routing from './Routing.jsx'

jest.mock('../App.jsx', () => () => <h1>Planner</h1>)

beforeEach(() => {
  localStorage.clear()
  window.history.replaceState(null, '', '/home/privada')
})

test('protege el acceso, valida credenciales y bloquea de nuevo al cerrar sesión', async () => {
  const { unmount } = render(<Routing />)
  expect(screen.queryByText('Página privada de prueba')).not.toBeInTheDocument()
  await waitFor(() => expect(window.location.pathname).toBe('/home/login'))
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'demo@planner.com' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'incorrecta' } })
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } })
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))
  expect(await screen.findByRole('heading', { name: 'Página privada de prueba' })).toBeInTheDocument()
  unmount()
  render(<Routing />)
  expect(screen.getByRole('heading', { name: 'Página privada de prueba' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
  expect(screen.getByRole('heading', { name: 'Inicia sesión' })).toBeInTheDocument()
  window.history.pushState(null, '', '/home/privada')
  fireEvent(window, new PopStateEvent('popstate'))
  expect(screen.queryByText('Página privada de prueba')).not.toBeInTheDocument()
  expect(localStorage.getItem('token')).toBeNull()
  expect(window.location.pathname).toBe('/home/login')
})

test('protege el planner y permite navegar después del login', async () => {
  window.history.replaceState(null, '', '/home/planner#activities')
  render(<Routing />)
  await waitFor(() => expect(window.location.pathname).toBe('/home/login'))
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'demo@planner.com' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } })
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))
  expect(window.location.pathname).toBe('/home/privada')
  fireEvent.click(screen.getByRole('link', { name: 'Mi planner' }))
  expect(window.location.pathname).toBe('/home/planner')
  expect(screen.getByRole('heading', { name: 'Planner' })).toBeInTheDocument()
})

test('con token permite acceso directo y omite el login', () => {
  localStorage.setItem('token', 'demo@planner.com')
  window.history.replaceState(null, '', '/home/login')
  render(<Routing />)
  expect(screen.getByRole('heading', { name: 'Página privada de prueba' })).toBeInTheDocument()
  expect(window.location.pathname).toBe('/home/privada')
})
