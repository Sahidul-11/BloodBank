import { Navigate, useLocation,  } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Spinner from '../Components/Share/Spinner'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Spinner/>
  if (!user) {
    return <Navigate to="/login" state={location?.pathname || "/"} ></Navigate>
  }
  if (user) return children

}

export default PrivateRoute
