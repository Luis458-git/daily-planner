import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculadora from './Calculadora'

test('renderiza dos inputs numéricos con labels y cuatro operaciones', () => {
  render(<Calculadora />)
  expect(screen.getByLabelText('Primer número')).toHaveAttribute('type', 'number')
  expect(screen.getByLabelText('Segundo número')).toHaveAttribute('type', 'number')
  for (const nombre of ['Sumar', 'Restar', 'Multiplicar', 'Dividir']) {
    expect(screen.getByRole('button', { name: nombre })).toBeInTheDocument()
  }
  expect(screen.getByRole('status')).toBeVisible()
})

test.each([
  ['Sumar', '15'],
  ['Restar', '5'],
  ['Multiplicar', '50'],
  ['Dividir', '2'],
])('%s muestra el resultado de operar 10 y 5', async (operacion, esperado) => {
  // Arrange: preparar la interfaz y el usuario.
  const user = userEvent.setup()
  render(<Calculadora />)
  // Act: introducir valores y elegir una operación.
  await user.type(screen.getByLabelText('Primer número'), '10')
  await user.type(screen.getByLabelText('Segundo número'), '5')
  await user.click(screen.getByRole('button', { name: operacion }))
  // Assert: comprobar el resultado visible.
  expect(screen.getByRole('status')).toHaveTextContent(`Resultado: ${esperado}`)
})

test('dividir entre cero muestra el mensaje y nunca Infinity, NaN o undefined', async () => {
  const user = userEvent.setup()
  render(<Calculadora />)
  await user.type(screen.getByLabelText('Primer número'), '10')
  await user.type(screen.getByLabelText('Segundo número'), '0')
  await user.click(screen.getByRole('button', { name: 'Dividir' }))
  expect(screen.getByText('No se puede dividir entre cero')).toBeVisible()
  expect(screen.queryByText(/Infinity|NaN|undefined/)).not.toBeInTheDocument()
})

test('los inputs vacíos no se convierten silenciosamente en cero', async () => {
  const user = userEvent.setup()
  render(<Calculadora />)
  await user.click(screen.getByRole('button', { name: 'Sumar' }))
  expect(screen.getByRole('status')).toHaveTextContent('Introduce dos números válidos.')
})

test('permite corregir el divisor después del error', async () => {
  const user = userEvent.setup()
  render(<Calculadora />)
  await user.type(screen.getByLabelText('Primer número'), '10')
  const divisor = screen.getByLabelText('Segundo número')
  await user.type(divisor, '0')
  await user.click(screen.getByRole('button', { name: 'Dividir' }))
  expect(screen.getByRole('status')).toHaveTextContent('No se puede dividir entre cero')
  await user.clear(divisor)
  await user.type(divisor, '4')
  await user.click(screen.getByRole('button', { name: 'Dividir' }))
  expect(screen.getByRole('status')).toHaveTextContent('Resultado: 2.5')
})
