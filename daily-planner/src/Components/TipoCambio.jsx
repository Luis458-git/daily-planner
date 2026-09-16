import { useEffect, useState } from 'react'

export default function TipoCambio() {
  const [datos, setDatos] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function consultar() {
      try {
        const respuesta = await fetch('http://apis.gometa.org/tdc/tdc.json', {
          signal: controller.signal,
        })
        if (!respuesta.ok) throw new Error('No se pudo consultar el tipo de cambio.')
        const resultado = await respuesta.json()
        if (!resultado || !Number.isFinite(resultado.compra) || !Number.isFinite(resultado.venta) || typeof resultado.updated !== 'string' || !resultado.updated.trim()) {
          throw new Error('La respuesta del tipo de cambio no es válida.')
        }
        if (!controller.signal.aborted) setDatos(resultado)
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message || 'No se pudo consultar el tipo de cambio.')
      }
    }
    consultar()
    return () => controller.abort()
  }, [])

  return (
    <section className="panel" aria-labelledby="tipo-cambio-titulo">
      <h2 id="tipo-cambio-titulo">Tipo de cambio</h2>
      {!datos && !error && <p role="status">Cargando tipo de cambio…</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {datos && <div>
        <p>Compra: ₡{datos.compra.toFixed(2)}</p>
        <p>Venta: ₡{datos.venta.toFixed(2)}</p>
        <p>Fecha de actualización: {datos.updated}</p>
      </div>}
    </section>
  )
}
