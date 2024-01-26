import { Errback, RequestHandler } from 'express'
import { v4 as uuid } from 'uuid'
import { STRIPE_SECRET_KEY } from '../config'
const stripe = require('stripe')(STRIPE_SECRET_KEY)
// import Stripe from 'stripe'
// const stripe = new Stripe(STRIPE_SECRET_KEY)
export const postCustomer: RequestHandler = (req, res, next) => {
	console.log(req.body.data)
	const { product, token } = JSON.parse(req.body.data)
	console.log('PRODUCT')
	console.log(product)
	console.log('PRICE', product.price)
	const idempontencyKey = uuid()
	console.log('idempontencyKey' + idempontencyKey)
	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer: any) => {
			stripe.charges.create(
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
				{ idempontencyKey },
			)
		})
		.catch((err: Errback) => console.log(err))
}
