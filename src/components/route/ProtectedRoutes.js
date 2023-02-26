import React, { Children, Fragment, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../actions/userActions'

import Loader from '../layout/Loader'

const ProtectedRoutes = ({ isAdmin, children }) => {

    const { isAuthenticated = false, loading = true, user } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        if(!user) {
            dispatch(loadUser())
        }
    }, [])

    if(loading) return <Loader />

    if(!loading && isAuthenticated) {

        // Not permission for regular user to access
        if(isAdmin === true && user.role !== 'admin') {
            return <Navigate to="/" />
        }
        return children;
    } else {
        return <Navigate to={'/login'} />
    }

}

export default ProtectedRoutes
