import { NextFunction, Request, Response } from 'express'
import { Server as SocketIOServer, Socket } from 'socket.io'

export const addIOToRequest = (io: SocketIOServer) => {
	return (req: Request, res: Response, next: NextFunction) => {
		req.io = io
		next()
	}
}
