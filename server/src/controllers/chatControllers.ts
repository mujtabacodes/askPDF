import { RequestHandler } from 'express'
import http from 'http'
import handler from 'serve-handler'
import nanobuffer from 'nanobuffer'
import { Server } from 'socket.io'
export const startChat: RequestHandler = (req, res, next) => {
	try {
		console.log('React to chat')
	} catch (error) {
		console.error('Got an error while retrieving files:', error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}
