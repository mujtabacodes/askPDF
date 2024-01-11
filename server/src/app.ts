import express, { NextFunction } from 'express'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import createHttpError from 'http-errors'

import { DB, FRONTEND_URL, PORT } from './config'
import { errorHandler } from './middleware/errorHanlder'

// Import your routes
import userRoute from './routes/userRoutes'
import uploadRoute from './routes/uploadRoutes'
import getfilesRoute from './routes/getfilesRoutes'
import chatRoute from './routes/chatRoutes'
import { addIOToRequest } from './middleware/socketIO'

const app = express()
app.use(
	cors({
		origin: FRONTEND_URL, // Replace with your frontend URL
		credentials: true, // If you're using credentials like cookies or authorization headers
	}),
)
app.use(express.json())
app.use(morgan('tiny'))

// Define HTTP server using the express app
const server = http.createServer(app)

// Set up socket.io on the server
// const io = new SocketIOServer(server)
const io = new SocketIOServer(server, {
	cors: {
		origin: FRONTEND_URL,
		methods: ['GET', 'POST'], // Adjust with required methods
	},
})

io.on('connection', socket => {
	console.log('user connected :' + socket.id)
	socket.emit('server_response', { type: 'bot', message: 'How can I help you today?' })
	socket.on('send_message', data => {
		socket.emit('user_message', { type: 'user', message: data.message })
		var query = ''
		query = `Your message ${data.message} is received`
		console.log(data)
		socket.emit('server_response', { type: 'bot', message: query })
		console.log(query)
	})
})

// Use your routes
app.use('/users', userRoute)
app.use('/upload', uploadRoute)
app.use('/get', getfilesRoute)
// app.use('/chat', addIOToRequest(io), chatRoute)

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
