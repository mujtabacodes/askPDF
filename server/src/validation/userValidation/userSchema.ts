import Joi from 'joi'

export const userSchema = {
	getUserData: Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
}
