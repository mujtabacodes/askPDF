import React, { useEffect } from 'react'
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

const Chat = () => {
	useEffect(() => {
		const socket = io('http://localhost:5000')
		socket.on('connect', () => {
			console.log('Socket Connected!!!')
		})
		socket.emit('send_message', { message: 'Hello' })
	}, [])
	return (
		<Container>
			<ChatContainer>
				<BotContainer>
					<BotIcon>
						<FaRobot style={{ color: 'black' }} />
					</BotIcon>
					<BotText>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum hic fuga unde
						obcaecati deserunt porro enim consectetur fugit placeat impedit, nam odio
						officia explicabo iure, quam tempora sit vitae est ab pariatur.
					</BotText>
				</BotContainer>

				<UserContainer>
					<UserText>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nisi
						blanditiis suscipit doloribus inventore amet tempora autem hic veniam,
						adipisci a!
					</UserText>

					<UserIcon>
						<BsFillChatDotsFill />
					</UserIcon>
				</UserContainer>
				<UserContainer>
					<UserText>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nisi
						blanditiis suscipit doloribus inventore amet tempora autem hic veniam,
						adipisci a!
					</UserText>

					<UserIcon>
						<BsFillChatDotsFill />
					</UserIcon>
				</UserContainer>
				<UserContainer>
					<UserText>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nisi
						blanditiis suscipit doloribus inventore amet tempora autem hic veniam,
						adipisci a!
					</UserText>

					<UserIcon>
						<BsFillChatDotsFill />
					</UserIcon>
				</UserContainer>
				<UserContainer>
					<UserText>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nisi
						blanditiis suscipit doloribus inventore amet tempora autem hic veniam,
						adipisci a!
					</UserText>

					<UserIcon>
						<BsFillChatDotsFill />
					</UserIcon>
				</UserContainer>
				<UserContainer>
					<UserText>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nisi
						blanditiis suscipit doloribus inventore amet tempora autem hic veniam,
						adipisci a!
					</UserText>

					<UserIcon>
						<BsFillChatDotsFill />
					</UserIcon>
				</UserContainer>
				<UserContainer>
					<UserText>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nisi
						blanditiis suscipit doloribus inventore amet tempora autem hic veniam,
						adipisci a!
					</UserText>

					<UserIcon>
						<BsFillChatDotsFill />
					</UserIcon>
				</UserContainer>
				<UserContainer>
					<UserText>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nisi
						blanditiis suscipit doloribus inventore amet tempora autem hic veniam,
						adipisci a!
					</UserText>

					<UserIcon>
						<BsFillChatDotsFill />
					</UserIcon>
				</UserContainer>
				<UserContainer>
					<UserText>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nisi
						blanditiis suscipit doloribus inventore amet tempora autem hic veniam,
						adipisci a!
					</UserText>

					<UserIcon>
						<BsFillChatDotsFill />
					</UserIcon>
				</UserContainer>
			</ChatContainer>
			<InputContainer>
				<Input type='text' placeholder='Ask to your PDF' />
				<Button>
					<Send />
				</Button>
			</InputContainer>
		</Container>
	)
}

export default Chat
