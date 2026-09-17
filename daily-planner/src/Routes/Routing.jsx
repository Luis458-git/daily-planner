import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import App from '../App.jsx'
import Login from '../Pages/Login.jsx'
import PrivatePage from '../Pages/PrivatePage.jsx'
import PrivateRoute from './PrivateRoute.jsx'

function LoginRoute() {
  const navigate = useNavigate()

  function login(email) {
    // Token de demostración. En una aplicación real lo devuelve el servidor.
    localStorage.setItem('token', email)
    navigate('/home/privada', { replace: true })
  }

  return localStorage.getItem('token')
    ? <Navigate to="/home/privada" replace />
    : <Login onLogin={login} />
}

function PrivateLayout() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('token')
    navigate('/home/login', { replace: true })
  }

  return <>
    <nav className="session-nav" aria-label="Sesión">
      <Link to="/home/planner#dashboard">Mi planner</Link>
      <Link to="/home/privada">Página privada</Link>
      <button onClick={logout}>Cerrar sesión</button>
    </nav>
    <Outlet />
  </>
}

export default function Routing() {
  return <BrowserRouter>
    <Routes>
      <Route path="/home/login" element={<LoginRoute />} />
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/home/privada" element={<PrivatePage />} />
          <Route path="/home/planner" element={<App />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/home/privada" replace />} />
    </Routes>
  </BrowserRouter>
}
