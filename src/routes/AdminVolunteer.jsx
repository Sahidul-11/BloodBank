import React from 'react';
import { Navigate, useLocation, } from 'react-router-dom'
import Spinner from '../Components/Share/Spinner';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const AdminVolunteer = ({ children }) => {
    const [role, isLoading] = useRole()
    const location = useLocation()
    const { loading } = useAuth()

    if (isLoading || loading) return <Spinner />
    if (role === 'volunteer' || role === "admin") return children
    if (role !== "admin") {
        return <Navigate to="/login" state={location?.pathname || "/"} ></Navigate>

    }
    if (role !== 'volunteer') {
        return <Navigate to="/login" state={location?.pathname || "/"} ></Navigate>
    }
 

}

export default AdminVolunteer;