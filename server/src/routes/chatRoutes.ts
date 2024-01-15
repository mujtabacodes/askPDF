// chatRoutes.ts
import express from 'express'
import { Router } from 'express'
import { Server as SocketIOServer } from 'socket.io'
import { startChat } from '../controllers/chatControllers'
const router: Router = express.Router()

const chatRoute = (io: SocketIOServer) => {
	io.on('connection', startChat(io))

	return router
}

export default chatRoute
