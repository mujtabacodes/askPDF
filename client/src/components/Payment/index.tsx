import { PaymentAPI } from '@/api'
import Button from '@components/Button'
import zIndex from '@mui/material/styles/zIndex'
import axios from 'axios'
import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Payment = () => {
	const [product, setproduct] = useState({
		name: 'React from FB',
		price: 10,
		productBy: 'facebook',
	})
	const processPayment = async (token: any) => {
		const body = {
			token,
			product,
		}

		try {
			const formData = new FormData()
			formData.append('data', JSON.stringify(body))

			const response = await axios.post(PaymentAPI, formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.status === 200) {
				return response
			} else {
				console.error('')
			}
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}
	return (
		<StripeCheckout
			stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
			token={processPayment}
			name='Buy React'
			amount={product.price * 100}
		>
			<Button>Pay with stripe</Button>
		</StripeCheckout>
	)
}

export default Payment
zIndex
