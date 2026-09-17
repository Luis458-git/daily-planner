import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const token = localStorage.getItem('token')

  // Si no existe token, lo manda al login.
  if (!token) {
    return <Navigate to="/home/login" replace />
  }

  // Si está autenticado, permite acceder a las rutas protegidas.
  return <Outlet />
}

export default PrivateRoute
