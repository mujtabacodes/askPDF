import express, { ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'
import exampleRoute from './routes/exampleRoutes'
import getfilesRoute from './routes/getfilesRoutes'
import chatRoute from './routes/chatRoutes'
import userRoute from './routes/userRoutes'
import uploadRoute from './routes/uploadRoutes'
import mongoose from 'mongoose'
import { DB, PORT } from './config'
import { errorHandler } from './middleware/errorHanlder'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny')) //this is use for just showing that which request hit and it will show in console

// app.use("/", exampleRoute);
app.use('/users', userRoute)
app.use('/upload', uploadRoute)
app.use('/get', getfilesRoute)
app.use('/chat', chatRoute)

app.use(() => {
	throw createHttpError(404, 'Route not found')
})

app.use(errorHandler)

mongoose
	.connect(DB)
	.then(() => {
		console.log('Connected to db')
		app.listen(PORT, () => {
			console.log(`Listening On PORT ${PORT}`)
		})
	})
	.catch(() => {
		throw createHttpError(501, 'Unable to connect database')
	})
