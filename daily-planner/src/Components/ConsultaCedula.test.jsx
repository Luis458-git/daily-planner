import { afterEach, expect, jest, test } from '@jest/globals'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConsultaCedula from './ConsultaCedula'

const originalFetch = globalThis.fetch
const respuestaHacienda = {
  nombre: 'ESTADO-MINISTERIO DE HACIENDA',
  tipoIdentificacion: '02',
  regimen: { codigo: 0, descripcion: 'No tiene' },
  situacion: { moroso: 'NO', omiso: 'NO', estado: 'Inscrito', administracionTributaria: 'San José' },
  actividades: [],
}
afterEach(() => { if (originalFetch) globalThis.fetch = originalFetch; else delete globalThis.fetch })

async function escribirYConsultar(valor = '2100042005') {
  const user = userEvent.setup()
  await user.type(screen.getByRole('textbox', { name: 'Identificación' }), valor)
  await user.click(screen.getByRole('button', { name: 'Consultar' }))
  return user
}

test('renderiza input y botón, y permite escribir sin consultar automáticamente', async () => {
  globalThis.fetch = jest.fn()
  render(<ConsultaCedula />)
  const input = screen.getByRole('textbox', { name: 'Identificación' })
  expect(screen.getByRole('button', { name: 'Consultar' })).toBeEnabled()
  await userEvent.setup().type(input, '2100042005')
  expect(input).toHaveValue('2100042005')
  expect(fetch).not.toHaveBeenCalled()
})

test.each(['2100042005', '123456789'])('consulta la identificación escrita %s y muestra la estructura real de Hacienda', async valor => {
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => respuestaHacienda })
  render(<ConsultaCedula />)
  await escribirYConsultar(valor)
  expect(fetch).toHaveBeenCalledWith(`https://api.hacienda.go.cr/fe/ae?identificacion=${valor}`, expect.objectContaining({ signal: expect.any(AbortSignal) }))
  expect(await screen.findByText('Nombre: ESTADO-MINISTERIO DE HACIENDA')).toBeInTheDocument()
  expect(screen.getByText('Estado de inscripción: Inscrito')).toBeInTheDocument()
  expect(screen.getByText('Moroso: NO')).toBeInTheDocument()
})

test('muestra Cargando… hasta recibir la respuesta', async () => {
  let resolver
  globalThis.fetch = jest.fn().mockImplementation(() => new Promise(resolve => { resolver = resolve }))
  render(<ConsultaCedula />)
  await escribirYConsultar()
  expect(screen.getByRole('status')).toHaveTextContent('Cargando…')
  expect(screen.getByRole('button', { name: 'Consultar' })).toBeDisabled()
  await act(async () => resolver({ ok: true, json: async () => respuestaHacienda }))
  expect(await screen.findByText('Nombre: ESTADO-MINISTERIO DE HACIENDA')).toBeInTheDocument()
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
})

test.each([null, {}, [], { nombre: 'Sin situación' }, { ...respuestaHacienda, situacion: {} }])('muestra cédula no encontrada ante datos inválidos: %j', async datos => {
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => datos })
  render(<ConsultaCedula />)
  await escribirYConsultar()
  expect(await screen.findByText('No se encontró esa cédula')).toBeInTheDocument()
  expect(screen.queryByText(/undefined/)).not.toBeInTheDocument()
})

test('maneja una respuesta vacía que no puede convertirse en JSON', async () => {
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => { throw new SyntaxError('Empty JSON') } })
  render(<ConsultaCedula />)
  await escribirYConsultar()
  expect(await screen.findByText('No se encontró esa cédula')).toBeInTheDocument()
})

test('muestra cédula no encontrada ante HTTP 404', async () => {
  globalThis.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 })
  render(<ConsultaCedula />)
  await escribirYConsultar()
  expect(await screen.findByText('No se encontró esa cédula')).toBeInTheDocument()
})

test('maneja un fallo de red sin conservar resultados anteriores', async () => {
  globalThis.fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => respuestaHacienda }).mockRejectedValueOnce(new Error('Network error'))
  render(<ConsultaCedula />)
  const user = await escribirYConsultar()
  expect(await screen.findByText('Nombre: ESTADO-MINISTERIO DE HACIENDA')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Consultar' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo realizar la consulta')
  expect(screen.queryByText('Nombre: ESTADO-MINISTERIO DE HACIENDA')).not.toBeInTheDocument()
})

test('no consulta una identificación vacía', async () => {
  globalThis.fetch = jest.fn()
  render(<ConsultaCedula />)
  await userEvent.setup().click(screen.getByRole('button', { name: 'Consultar' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Escribe una identificación')
  expect(fetch).not.toHaveBeenCalled()
})
