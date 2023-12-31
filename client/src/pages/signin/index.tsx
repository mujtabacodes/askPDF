import Textfield from '@components/Textfield'
import { Container, Content, Form, Image, LeftSide, RightSide, Title } from './styled'
import Button from '@components/Button'
import SiginIMG from '@assets/images/signin.png'
import { useState } from 'react'
import axios from 'axios'
import { loginUser } from '@/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated, setUserData } from '@redux/slices/auth'

const Sigin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const Navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogin = async (event: any) => {
		event.preventDefault()
		const userData = {
			email: email,
			password: password,
		}

		try {
			const response = await axios.get(loginUser, {
				params: userData,
				headers: {
					'Content-Type': 'application/json',
				},
			})
			console.log(response)
			if (response.status === 200) {
				// Registration successful, you can handle the success accordingly
				dispatch(setIsAuthenticated(true))
				Navigate('/dashboard')
				dispatch(setUserData(response.data))
				// sessionStorage.setItem('user_id', response.data.user_id)
				// sessionStorage.setItem('user_name', response.data.name)
				// sessionStorage.setItem('user_email', response.data.email)
				// Redirect or show success message
			} else {
				// Registration failed, handle the error
				console.error('Registration failed')
				// Display an error message or handle the error
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<Container>
			<Content>
				<LeftSide>
					<Image src={SiginIMG} />
				</LeftSide>
				<RightSide>
					<Title>Sign in to Account</Title>
					<Form onSubmit={handleLogin}>
						<Textfield
							label='Enter Email'
							type='Email'
							value={email}
							setValue={setEmail}
							required
						/>
						<Textfield
							label='Enter Password'
							type='Password'
							value={password}
							setValue={setPassword}
							required
						/>
						<Button>Submit</Button>
					</Form>
				</RightSide>
			</Content>
		</Container>
	)
}

export default Sigin
