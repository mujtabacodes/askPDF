import { Errback, RequestHandler } from 'express'
import { v4 as uuid } from 'uuid'
import { FRONTEND_URL, STRIPE_SECRET_KEY } from '../config'
import User, { IUser } from '../model/User'
import createHttpError from 'http-errors'
// const stripe = require('stripe')(STRIPE_SECRET_KEY)

import Stripe from 'stripe'
const stripe = new Stripe(STRIPE_SECRET_KEY)
export const postCustomer: RequestHandler = async (req, res, next) => {
	try {
		const { product, token } = JSON.parse(req.body.data)
		console.log('PRODUCT', product)
		console.log('PRICE', product.price)
		const idempotencyKey = uuid()
		console.log('idempotencyKey', idempotencyKey)

		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		})

		// Update user details
		const user = await User.findOneAndUpdate(
			{ email: token.email },
			{
				$set: {
					stripeCustomerId: customer.id,
					paymentStatus: 'paid',
				},
			},
			{ new: true },
		)

		if (!user) {
			// If user not found, handle accordingly
			return res.status(404).json({ success: false, error: 'User not found' })
		}

		const charge = await stripe.charges.create(
			{
				amount: product.price * 100,
				currency: 'usd',
				customer: customer.id,
				receipt_email: token.email,
				description: `purchase of ${product.name}`,
				shipping: {
					name: token.card.name,
					address: {
						country: token.card.address_country,
					},
				},
			},
			{ idempotencyKey },
		)

		console.log('charge', charge)
		res.status(200).json({ success: true })
	} catch (error) {
		console.error('Error:', error)
		res.status(500).json({ success: false, error: 'Internal Server Error' })
	}
}

export const checkPaymentStatus: RequestHandler = async (req, res, next) => {
	let { user_id } = req.query
	try {
		const user = await User.findById(user_id)

		if (!user) {
			return next(createHttpError(404, 'User not found'))
		}
		console.log('User found successfully')
		console.log(user.paymentStatus)
		res.status(200).json({ paymentStatus: user.paymentStatus })
	} catch (error) {
		return next(createHttpError(500, { error }))
	}
}
