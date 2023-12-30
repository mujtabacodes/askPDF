import { useAuthSlice } from '@redux/hooks'
import { useReducer } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
	let auth = { token: useAuthSlice(e => e.isAuthenticated) }
	return auth.token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
