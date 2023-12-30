import { RequestHandler } from 'express'
import validator from '../utils/validator'
import { userSchema } from './userSchema'

export const getUserDataValidation: RequestHandler = (res, req, next) => {
	validator(userSchema.getUserData, req.body, next)
}
