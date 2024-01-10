import React, { FormEventHandler, useEffect, useState } from 'react'
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

const Chat = () => {
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState('')
	const socket = io(chatAPI)

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Socket Connected!!!')
		})

		// Listen for incoming messages from the server
		socket.on('server_response', data => {
			setMessages([...messages, { type: data.from, text: data.message }])
		})
	}, [messages])

	const handleSubmit = (event: any) => {
		event.preventDefault()

		// Send the user's message to the server
		socket.emit('send_message', { from: 'user', message: input })
		setMessages([...messages, { type: 'user', text: input }])
		setInput('')
	}

	return (
		<Container>
			<ChatContainer>
				{messages.map((message, index) => (
					<React.Fragment key={index}>
						{message.type === 'bot' ? (
							<BotContainer>
								<BotIcon>
									<FaRobot style={{ color: 'black' }} />
								</BotIcon>
								<BotText>{message.text}</BotText>
							</BotContainer>
						) : (
							<UserContainer>
								<UserText>{message.text}</UserText>
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
