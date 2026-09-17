import { Link } from 'react-router-dom'

export default function PrivatePage() {
  const user = localStorage.getItem('token')
  return <main className="login-page">
    <section className="login-card" aria-labelledby="private-title">
      <p className="eyebrow">ACCESO AUTORIZADO</p>
      <h1 id="private-title">Página privada de prueba</h1>
      <p>Bienvenido, <strong>{user}</strong>.</p>
      <p>Esta página solo se muestra cuando has iniciado sesión. Puedes recargar para comprobar que la sesión se mantiene guardada en el navegador.</p>
      <p className="muted">Para probar la protección, cierra sesión e intenta abrir <code>/home/privada</code>: volverás al login.</p>
      <Link className="private-link" to="/home/planner#dashboard">Ir a mi planner →</Link>
    </section>
  </main>
}
