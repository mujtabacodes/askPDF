import { PaymentStatusAPI } from '@/api'
import { useAuthSlice } from '@redux/hooks'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
	const [paymentStatus, setPaymentStatus] = useState('unpaid')
	const [loading, setLoading] = useState(true)
	const auth = useAuthSlice(e => e.isAuthenticated)
	const userDetails = useAuthSlice(e => e.userData)

	useEffect(() => {
		if (auth) {
			axios
				.get(PaymentStatusAPI, {
					params: userDetails,
					headers: { 'Content-Type': 'application/json' },
				})
				.then(res => {
					console.log('res uis')
					console.log(res.data.paymentStatus)
					setPaymentStatus(res.data.paymentStatus)
				})
				.catch(err => {
					console.error(err)
					// Handle the error appropriately, e.g., set an error state or log it
				})
				.finally(() => {
					setLoading(false) // Set loading to false regardless of success or failure
				})
		} else {
			setLoading(false) // If not authenticated, set loading to false
		}
	}, [auth, userDetails])

	if (loading) {
		// You can render a loading indicator here if needed
		return <div>Loading...</div>
	}

	if (auth) {
		if (paymentStatus === 'paid') {
			return <Outlet />
		} else {
			return <Navigate to='/payment' />
		}
	} else {
		return <Navigate to='/signin' />
	}
}

export default PrivateRoutes
