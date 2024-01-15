// chatController.ts
import { Socket } from 'socket.io'
import { Server as SocketIOServer } from 'socket.io'

export const startChat = (io: SocketIOServer) => (socket: Socket) => {
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
}
