import { PaymentAPI } from '@/api'
import Button from '@components/Button'
import zIndex from '@mui/material/styles/zIndex'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'

const Payment = () => {
	const [product, setproduct] = useState({
		name: 'React from FB',
		price: 10,
		productBy: 'facebook',
	})
	const Navigate = useNavigate()
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
				Navigate('/dashboard')
			} else {
				console.error('')
			}
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}
	const handleAlreadyPaid = () => {
		Navigate('/dashboard')
	}
	return (
		<React.Fragment>
			<StripeCheckout
				stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
				token={processPayment}
				name='Buy ASK PDF'
				amount={product.price * 100}
			>
				<Button>Pay with stripe</Button>
			</StripeCheckout>
			<Button onClick={handleAlreadyPaid}>Already Paid</Button>
		</React.Fragment>
	)
}

export default Payment
zIndex
