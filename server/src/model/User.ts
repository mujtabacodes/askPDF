import { Document, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'

export interface IUser extends Document {
	name: string
	email: string
	password: string
	comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
})

userSchema.methods.comparePassword = async function (
	candidatePassword: string,
): Promise<boolean> {
	try {
		const match = await bcrypt.compare(candidatePassword, this.password)
		return match
	} catch (error) {
		throw error
	}
}

userSchema.pre<IUser>('save', async function (next) {
	const user = this
	if (!user.isModified('password')) {
		return next()
	}

	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(user.password, salt)
		user.password = hashedPassword
		next()
	} catch (error) {
		return next(createHttpError(500, { error }))
	}
})

const User = model<IUser>('User', userSchema)

export default User
