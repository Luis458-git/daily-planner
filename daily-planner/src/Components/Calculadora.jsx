import { useState } from 'react'
import { sumar, restar, multiplicar, dividir } from '../utils/matematicas'

export default function Calculadora() {
  const [primero, setPrimero] = useState('')
  const [segundo, setSegundo] = useState('')
  const [resultado, setResultado] = useState('Introduce dos números y selecciona una operación.')

  function calcular(operacion) {
    const a = Number(primero)
    const b = Number(segundo)
    if (primero.trim() === '' || segundo.trim() === '' || !Number.isFinite(a) || !Number.isFinite(b)) {
      setResultado('Introduce dos números válidos.')
      return
    }
    // Las operaciones se realizan con las funciones existentes, sin duplicarlas.
    const valor = operacion(a, b)
    if (valor === null) {
      setResultado('No se puede dividir entre cero')
    } else if (!Number.isFinite(valor)) {
      setResultado('El resultado está fuera del rango permitido.')
    } else {
      setResultado(`Resultado: ${valor}`)
    }
  }

  return (
    <section className="panel" aria-labelledby="calculadora-titulo">
      <h1 id="calculadora-titulo">Calculadora</h1>
      <div className="editor">
        <div className="time-fields">
          <label htmlFor="primer-numero">Primer número
            <input id="primer-numero" type="number" step="any" value={primero} onChange={event => setPrimero(event.target.value)} />
          </label>
          <label htmlFor="segundo-numero">Segundo número
            <input id="segundo-numero" type="number" step="any" value={segundo} onChange={event => setSegundo(event.target.value)} />
          </label>
        </div>
        <div className="actions">
          <button type="button" onClick={() => calcular(sumar)}>Sumar</button>
          <button type="button" onClick={() => calcular(restar)}>Restar</button>
          <button type="button" onClick={() => calcular(multiplicar)}>Multiplicar</button>
          <button type="button" onClick={() => calcular(dividir)}>Dividir</button>
        </div>
        <p role="status" aria-atomic="true">{resultado}</p>
      </div>
    </section>
  )
}
