import { RequestHandler } from 'express'
import User from '../model/User'
import createHttpError from 'http-errors'
interface IUserData {
	name: string
	email: string
	password: string
}

interface ILoginData {
	email: string
	password: string
}
export const getUsers: RequestHandler = async (req, res, next) => {
	try {
		const Users = await User.find({})
		res.json(Users)
	} catch (error) {
		return next(createHttpError.InternalServerError)
	}
}

export const addUser: RequestHandler = async (req, res, next) => {
	const { name, password, email }: IUserData = req.body

	try {
		const user = await User.findOne({ email })

		if (user) {
			return next(createHttpError(406, 'This user already exists'))
		}
		const body = req.body
		const newUser = new User({ name, password, email })

		await newUser.save()
		res.status(200).json(`User ${name} registered successfully`)
	} catch (error) {
		return next(createHttpError.InternalServerError)
	}
}

export const checkUser: RequestHandler = async (req, res, next) => {
	let { email, password }: ILoginData = req.query as { email: string; password: string }

	try {
		const user = await User.findOne({ email }).select('+password') // select is used to pick the fields we want in our query

		if (!user) {
			return next(createHttpError(404, 'User not found'))
		}
		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			return next(createHttpError(401, 'Incorrect password'))
		}
		res.status(200).json({ user_id: user._id, name: user.name, email: user.email })
	} catch (error) {
		return next(createHttpError({ error }))
	}
}

export const deleteAllUsers: RequestHandler = async (req, res, next) => {
	try {
		await User.deleteMany({})
		res.status(200).json('All users deleted successfully')
	} catch (error) {
		return next(createHttpError.InternalServerError)
	}
}

export const deleteUser: RequestHandler = async (req, res, next) => {
	const { id } = req.params
	try {
		const user = await User.findByIdAndDelete(id)
		if (!user) {
			return next(createHttpError(404, 'User not found'))
		}
		res.status(200).json(`User deleted successfully`)
	} catch (error) {
		return next(createHttpError(500, { error }))
	}
}
