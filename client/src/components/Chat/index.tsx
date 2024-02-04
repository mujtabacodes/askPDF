import React, { useEffect, useRef, useState } from 'react'
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
import { useAuthSlice } from '@redux/hooks'

interface IChat {
	fileNames: string[]
}
interface IUserDetails {
	user_id: string
}

const Chat = (p: IChat) => {
	const { fileNames } = p
	const [messages, setMessages] = useState<{ type: string; message: string }[]>([])
	const [input, setInput] = useState('')
	const chatContainerRef = useRef<HTMLDivElement | null>(null)


	const socket = io(chatAPI,{
	transports: ['websocket'],
	path: '/socket.io/'});

	const userDetails = useAuthSlice(e => e.userData) as IUserDetails

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Socket Connected!!!')
		})

		socket.emit('files_send', {
			type: 'bot',
			files: fileNames,
			user_id: userDetails.user_id,
		})

		socket.on('server_response', data => {
			console.log('Server_response')
			console.log(data)
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
			console.log('user_message')
			console.log(data.message)
			setMessages([...messages, { type: data.type, message: data.message }])
		})
		scrollToBottom()

		socket.on('server_response', data => {
			console.log('Server_response')
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
				<Button type='submit' primary>
					<Send />
				</Button>
			</InputContainer>
		</Container>
	)
}

export default Chat
