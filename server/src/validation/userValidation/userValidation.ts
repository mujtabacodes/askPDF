import { RequestHandler } from 'express'
import validator from '../utils/validator'
import { userSchema } from './userSchema'

export const getUserDataValidation: RequestHandler = (req, res, next) => {
	validator(userSchema.getUserData, req.body, next)
}
