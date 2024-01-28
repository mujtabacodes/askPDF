import { Socket } from 'socket.io'
import { Server as SocketIOServer } from 'socket.io'
import * as fs from 'fs'
import * as path from 'path'
import pdfParse from 'pdf-parse'
import { ChatGPT } from '../ai'
import { Standalone } from '../ai/standalone'

const ExtractFileName = (fileName: string) => {
	const cleanedFileName = fileName.substring(fileName.indexOf('-') + 1)
	console.log(cleanedFileName)
	return cleanedFileName
}

const processPDF = async (userId: string, fileName: string) => {
	const filePath = path.join(__dirname, '..', 'assets', 'uploads', userId, fileName)

	// Read PDF file
	const dataBuffer = fs.readFileSync(filePath)
	const data = await pdfParse(dataBuffer)

	// Extracted text content
	const pdfText = data.text

	// Generate a question for ChatGPT based on the PDF content
	const chatGPTResponse = await ChatGPT(pdfText)
	// console.log('We are at chatController')
	console.log(chatGPTResponse)
	return chatGPTResponse
}

export const startChat = (io: SocketIOServer) => (socket: Socket) => {
	console.log('user connected :' + socket.id)
	socket.emit('server_response', { type: 'bot', message: 'Welcome to AskPDF!' })
	let fileName = null
	let userId = null
	let chatGPTResponse = null

	socket.on('file_send', async data => {
		fileName = data.file
		userId = data.user_id

		const query = `Your file "${ExtractFileName(
			data.file,
		)}" is received. Now you can chat!!`
		console.log('user-id is' + userId + ' and file name is' + fileName)
		socket.emit('server_response', { type: 'bot', message: query })

		// Process the PDF and initiate conversation with ChatGPT
		chatGPTResponse = await processPDF(userId, fileName)
		socket.emit('server_response', { type: 'bot', message: chatGPTResponse })
	})

	socket.on('send_message', async data => {
		socket.emit('user_message', { type: 'user', message: data.message })
		const res = await Standalone(data.message)

		// Continue the conversation with ChatGPT based on user's message
		// chatGPTResponse = await ChatGPT(data.message)
		chatGPTResponse = 'ChatGPT response is cooking....'
		socket.emit('server_response', { type: 'bot', message: res })
	})
}
