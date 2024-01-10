import { Request, Response } from 'express'
import { Socket } from 'socket.io'

export const startChat = (req: Request, res: Response) => {
	console.log('We are at start chat Controller')
	const io = req.io

	io.on('connection', (socket: any) => {
		console.log('New user connected' + socket.id)
		// Handle events, emit messages, etc.
	})

	// Return a success response if needed
	// res.status(200).json({ message: 'Chat started successfully' });
}
