import React from 'react';
import { Navigate, useLocation, } from 'react-router-dom'
import useRole from '../hooks/useRole';
import Spinner from '../Components/Share/Spinner';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()
  const location = useLocation()
  const {loading} =useAuth()
   
  if (isLoading || loading) return <Spinner />
  if (role !== "admin") {
    return <Navigate to="/login" state={location?.pathname || "/"} ></Navigate>
  }
  if (role === "admin") return children

}

export default AdminRoute;