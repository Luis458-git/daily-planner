import { afterEach, expect, jest, test } from '@jest/globals'
import { render, screen, act } from '@testing-library/react'
import TipoCambio from './TipoCambio'

const originalFetch = globalThis.fetch
const respuesta = { updated: 'Thu Sep 3 01:30:02 2026', compra: 447.49, venta: 451.7, compra_date: '2026-09-03', venta_date: '2026-09-03' }
afterEach(() => { if (originalFetch) globalThis.fetch = originalFetch; else delete globalThis.fetch })

test('consulta al montar y muestra valores con exactamente dos decimales', async () => {
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => respuesta })
  render(<TipoCambio />)
  expect(screen.getByRole('status')).toHaveTextContent('Cargando')
  expect(await screen.findByText('Compra: ₡447.49')).toBeInTheDocument()
  expect(screen.getByText('Venta: ₡451.70')).toBeInTheDocument()
  expect(screen.getByText(`Fecha de actualización: ${respuesta.updated}`)).toBeInTheDocument()
  expect(fetch).toHaveBeenCalledWith('http://apis.gometa.org/tdc/tdc.json', expect.objectContaining({ signal: expect.any(AbortSignal) }))
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
})

test('formatea valores enteros con dos decimales', async () => {
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ...respuesta, compra: 447, venta: 452 }) })
  render(<TipoCambio />)
  expect(await screen.findByText('Compra: ₡447.00')).toBeInTheDocument()
  expect(screen.getByText('Venta: ₡452.00')).toBeInTheDocument()
})

test('muestra un error HTTP', async () => {
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: false })
  render(<TipoCambio />)
  expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo consultar')
})

test('maneja fallos de red', async () => {
  globalThis.fetch = jest.fn().mockRejectedValue(new Error('Sin conexión'))
  render(<TipoCambio />)
  expect(await screen.findByRole('alert')).toHaveTextContent('Sin conexión')
})

test('rechaza datos incompletos sin mostrar NaN', async () => {
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ updated: respuesta.updated }) })
  render(<TipoCambio />)
  expect(await screen.findByRole('alert')).toHaveTextContent('no es válida')
  expect(screen.queryByText(/NaN/)).not.toBeInTheDocument()
})

test('cancela la petición al desmontar', async () => {
  let resolver
  globalThis.fetch = jest.fn().mockImplementation(() => new Promise(resolve => { resolver = resolve }))
  const { unmount } = render(<TipoCambio />)
  const signal = fetch.mock.calls[0][1].signal
  unmount()
  expect(signal.aborted).toBe(true)
  await act(async () => resolver({ ok: true, json: async () => respuesta }))
})
