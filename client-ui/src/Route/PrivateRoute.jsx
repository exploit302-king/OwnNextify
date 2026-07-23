import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { Outlet } from 'react-router-dom'
import useAuth from '../context/auth'
import NotFoundPage from '../screens/P404'
const PrivateRoute = () => {
  // loading 
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    auth?.token && fetchLoggedUser()
  }, [auth?.token])

  const fetchLoggedUser = async () => {
    try {
      setLoading(true)
      await axios.get("/fetch-logged-user", {
        headers: { Authorization: auth?.token }
      })

      setOk(true)

    } catch (error) {
      setOk(false)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return <Loader />
  }
  return (
    <>

      ok ? <Outlet /> : <NotFoundPage />
    </>
  )
}

export default PrivateRoute
