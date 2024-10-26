import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

const ProtectedRoute = () => {
  const { isLoggedIn, userInformation } = useSession()
  console.log('***InProtectedRoutes***', isLoggedIn, userInformation)
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
