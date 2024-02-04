// app.ts
import express from 'express'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import createHttpError from 'http-errors'

import { DB, FRONTEND_URL, PORT } from './config'
import { errorHandler } from './middleware/errorHanlder'

import userRoute from './routes/userRoutes'
import uploadRoute from './routes/uploadRoutes'
import getfilesRoute from './routes/getfilesRoutes'
import chatRoute from './routes/chatRoutes'
import stripeRoute from './routes/stripeRoute'
const app = express()
app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	}),
)
app.use(express.json())
app.use(morgan('tiny'))

const server = http.createServer(app)

const io = new SocketIOServer(server, {
	cors: {
		origin: FRONTEND_URL,
		methods: ['GET', 'POST'], // Adjust with required methods
	},
})/*
io.of('/socket.io/').on('connection', (socket) => {
console.log('user connected :' + socket.id)
	socket.emit('server_response', { type: 'bot', message: 'Welcome to AskPDF!' })});*/
app.use('/users', userRoute)
app.use('/upload', uploadRoute)
app.use('/get', getfilesRoute)
app.use('/', chatRoute(io))
app.use('/payment', stripeRoute)

app.use(() => {
	throw createHttpError(404, 'Route not found')
})

app.use(errorHandler)
mongoose
	.connect(DB)
	.then(() => {
		console.log('Connected to db')
		server.listen(PORT, () => {
			console.log(`Listening On PORT ${PORT}`)
		})
	})
	.catch(() => {
		throw createHttpError(501, 'Unable to connect to the database')
	})
