import { useEffect, useRef, useState } from 'react'

export default function ConsultaCedula() {
  const [identificacion, setIdentificacion] = useState('')
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const peticion = useRef(null)

  useEffect(() => () => peticion.current?.abort(), [])

  async function consultar(event) {
    event.preventDefault()
    const valor = identificacion.trim()
    setDatos(null)
    if (!valor) {
      setMensaje('Escribe una identificación.')
      return
    }
    peticion.current?.abort()
    const controller = new AbortController()
    peticion.current = controller
    setCargando(true)
    setMensaje('')
    try {
      const respuesta = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${encodeURIComponent(valor)}`, {
        signal: controller.signal,
      })
      if (respuesta.status === 404) {
        if (!controller.signal.aborted) setMensaje('No se encontró esa cédula')
        return
      }
      if (!respuesta.ok) throw new Error('No se pudo realizar la consulta. Intenta nuevamente.')
      // Una respuesta vacía o que no sea JSON se trata como ausencia de datos.
      const resultado = await respuesta.json().catch(() => null)
      if (controller.signal.aborted) return
      const campos = [resultado?.nombre, resultado?.situacion?.estado, resultado?.situacion?.moroso]
      if (!campos.every(campo => typeof campo === 'string' && campo.trim())) {
        setMensaje('No se encontró esa cédula')
        return
      }
      setDatos(resultado)
    } catch {
      if (!controller.signal.aborted) setMensaje('No se pudo realizar la consulta. Intenta nuevamente.')
    } finally {
      if (!controller.signal.aborted) setCargando(false)
    }
  }

  return (
    <section className="panel" aria-labelledby="consulta-cedula-titulo">
      <h2 id="consulta-cedula-titulo">Consulta de cédula</h2>
      <form className="editor" onSubmit={consultar}>
        <label htmlFor="identificacion">Identificación</label>
        <input id="identificacion" type="text" value={identificacion} disabled={cargando}
          onChange={event => { setIdentificacion(event.target.value); setDatos(null); setMensaje('') }} />
        <div className="actions"><button className="primary" type="submit" disabled={cargando}>Consultar</button></div>
      </form>
      {cargando && <p role="status">Cargando…</p>}
      {mensaje && <p role="alert">{mensaje}</p>}
      {datos && <div aria-live="polite">
        <p>Nombre: {datos.nombre}</p>
        <p>Estado de inscripción: {datos.situacion.estado}</p>
        <p>Moroso: {datos.situacion.moroso}</p>
      </div>}
    </section>
  )
}
