import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

import {
	BotContainer,
	BotIcon,
	BotText,
	ChatContainer,
	Container,
	Input,
	InputContainer,
	UserContainer,
	UserIcon,
	UserText,
} from './styled'
import { FaRobot } from 'react-icons/fa'
import { BsFillChatDotsFill } from 'react-icons/bs'
import Textfield from '@components/Textfield'
import Button from '@components/Button'
import { Send } from '@mui/icons-material'
import { chatAPI } from '@/api'

interface IChat {
	fileName: string
}

const Chat = (p: IChat) => {
	const { fileName } = p
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState('')
	const chatContainerRef = useRef(null)

	const socket = io(chatAPI)

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Socket Connected!!!')
		})
		socket.emit('file_send', { type: 'bot', message: fileName })
		socket.on('server_response', data => {
			setMessages(prevMessages => [
				...prevMessages,
				{ type: data.type, message: data.message },
			])
		})
		scrollToBottom()
	}, [])

	const handleSubmit = async (event: any) => {
		event.preventDefault()
		socket.emit('send_message', { type: 'user', message: input })
		setInput('')
		checkServerResponse()
		scrollToBottom() // Scroll to bottom after sending a message
	}

	const checkServerResponse = () => {
		socket.on('user_message', data => {
			console.log(data.message)
			setMessages([...messages, { type: data.type, message: data.message }])
		})
		scrollToBottom()
		socket.on('server_response', data => {
			console.log(data.message)
			setMessages(prevMessages => [
				...prevMessages,
				{ type: data.type, message: data.message },
			])
		})
		scrollToBottom()
	}
	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
			console.log('We are at chatRef')
			console.log(chatContainerRef.current)
		}
	}
	return (
		<Container>
			<ChatContainer ref={chatContainerRef}>
				{messages.map((message, index) => (
					<React.Fragment key={index}>
						{message.type === 'bot' ? (
							<BotContainer>
								<BotIcon>
									<FaRobot style={{ color: 'black' }} />
								</BotIcon>
								<BotText>{message.message}</BotText>
							</BotContainer>
						) : (
							<UserContainer>
								<UserText>{message.message}</UserText>
								<UserIcon>
									<BsFillChatDotsFill />
								</UserIcon>
							</UserContainer>
						)}
					</React.Fragment>
				))}
			</ChatContainer>
			<InputContainer onSubmit={handleSubmit}>
				<Input
					type='text'
					placeholder='Ask to your PDF'
					onChange={event => setInput(event.target.value)}
					value={input}
				/>
				<Button type='submit'>
					<Send />
				</Button>
			</InputContainer>
		</Container>
	)
}

export default Chat
