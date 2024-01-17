import { Socket } from 'socket.io'
import { Server as SocketIOServer } from 'socket.io'

const ExtractFileName = (fileName: string) => {
	const cleanedFileName = fileName.substring(fileName.indexOf('-') + 1)
	console.log(cleanedFileName)
	return cleanedFileName
}
export const startChat = (io: SocketIOServer) => (socket: Socket) => {
	console.log('user connected :' + socket.id)
	socket.emit('server_response', { type: 'bot', message: 'Welcome to AskPDF!' })
	var fileName = null

	socket.on('file_send', data => {
		var query = ''
		fileName = data.message
		query = `Your file "${ExtractFileName(data.message)}" is received now you can chat!!`
		console.log(fileName)
		socket.emit('server_response', { type: 'bot', message: query })
	})

	socket.on('send_message', data => {
		socket.emit('user_message', { type: 'user', message: data.message })
		var query = ''
		query = `Your message ${data.message} is received`
		console.log(data)
		socket.emit('server_response', { type: 'bot', message: query })
		console.log(query)
	})
}
