import { useState } from 'react'
import '../Styles/Login.css'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (email.trim() !== 'demo@planner.com' || password !== '123456') {
      setError('Correo o contraseña incorrectos.')
      return
    }
    try {
      onLogin(email.trim())
    } catch {
      setError('No se pudo guardar la sesión. Habilita el almacenamiento del navegador e intenta de nuevo.')
    }
  }

  return <main className="login-page">
    <section className="login-card" aria-labelledby="login-title">
      <p className="eyebrow">DAILY PLANNER</p>
      <h1 id="login-title">Inicia sesión</h1>
      <p className="muted">Entra a tu espacio para organizar el día.</p>
      <form onSubmit={submit} className="login-form">
        <label htmlFor="email">Correo electrónico</label>
        <input id="email" type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} />
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} />
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary" type="submit">Entrar</button>
      </form>
      <p className="login-demo">Cuenta de prueba: <strong>demo@planner.com</strong><br />Contraseña: <strong>123456</strong></p>
      <small>Demostración local de rutas privadas, sin autenticación de servidor.</small>
    </section>
  </main>
}
