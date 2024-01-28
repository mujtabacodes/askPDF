import { PaymentAPI } from '@/api'
import zIndex from '@mui/material/styles/zIndex'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { Container, styleButton as Button } from './styled'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { FaUnlockAlt } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { HomeIcon } from '@pages/signin/styled'
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
		<Container>
			<HomeIcon onClick={() => Navigate('/')}>
				<IoMdArrowRoundBack />
			</HomeIcon>
			<Button onClick={handleAlreadyPaid}>
				<LiaFileInvoiceDollarSolid /> Already Paid
			</Button>

			<StripeCheckout
				stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
				token={processPayment}
				name='ASK PDF'
				amount={product.price * 100}
			>
				<Button primary>
					<FaUnlockAlt />
					Pay now
				</Button>
			</StripeCheckout>
		</Container>
	)
}

export default Payment
zIndex
