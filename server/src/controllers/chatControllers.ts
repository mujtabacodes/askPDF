import { Socket } from 'socket.io'
import { Server as SocketIOServer } from 'socket.io'
import * as fs from 'fs'
import * as path from 'path'
import pdfParse from 'pdf-parse'
import axios from 'axios'
import { ChatGPT_API } from '../config'
const ExtractFileName = (fileName: string) => {
	const cleanedFileName = fileName.substring(fileName.indexOf('-') + 1)
	console.log(cleanedFileName)
	return cleanedFileName
}

const processPDF = async (userId: string, fileName: string) => {
	const filePath = path.join(
		__dirname,
		'..',
		'assets',
		'uploads',
		`${userId}`,
		`${fileName}`,
	)
	// Read PDF file
	const dataBuffer = fs.readFileSync(filePath)
	const data = await pdfParse(dataBuffer)

	// Extracted text content
	const pdfText = data.text

	// Generate a question for ChatGPT based on the PDF content
	// const chatGPTQuestion = `What would you like to know about the content of the PDF?`
	const chatGPTQuestion = pdfText

	return chatGPTQuestion
}

const sendToChatGPT = async (message: string) => {
	try {
		const response = await axios.post(ChatGPT_API, {
			message,
		})

		return response.data // Assuming the API response contains the chatGPT response
	} catch (error) {
		console.error('Error communicating with ChatGPT API:', 'error.message')
		throw error
	}
}

export const startChat = (io: SocketIOServer) => (socket: Socket) => {
	console.log('user connected :' + socket.id)
	socket.emit('server_response', { type: 'bot', message: 'Welcome to AskPDF!' })
	var fileName = null
	var user_id = null

	socket.on('file_send', async data => {
		var query = ''
		fileName = data.file
		user_id = data.user_id
		query = `Your file "${ExtractFileName(data.file)}" is received now you can chat!!`
		console.log('user-id is' + user_id + ' and file name is' + fileName)
		socket.emit('server_response', { type: 'bot', message: query })
		const chatGPTQuestion = await processPDF(user_id, fileName)
		socket.emit('server_response', { type: 'bot', message: chatGPTQuestion })
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
