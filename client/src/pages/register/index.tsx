import Textfield from '@components/Textfield'
import { Container, Content, CustomButton, Form, Title } from './styled'
import Button from '@components/Button'
import SiginIMG from '@assets/images/signin.png'
import { T14, T48Bold } from '@styles/typo'
import Divider from '@components/Divider'
import { Row } from '@styles/util'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { createUser } from '@/api'
const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const Navigate = useNavigate()

	const handleRegistration = async (event: any) => {
		event.preventDefault()
		const userData = {
			name: name,
			email: email,
			password: password,
		}

		try {
			const response = await axios.post(createUser, userData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.status === 200) {
				// Registration successful, you can handle the success accordingly
				console.log('Registration successful')
				alert('User register successfully')
				Navigate('/dashboard')
				// Redirect or show success message
			} else {
				// Registration failed, handle the error
				console.error('Registration failed')
				// Display an error message or handle the error
			}
		} catch (error) {
			alert(error)
		}
	}
	const resetField = () => {
		setName('')
		setEmail('')
		setPassword('')
	}
	return (
		<Container>
			<Content>
				<Title below={20}>Create your account</Title>
				<Form onSubmit={handleRegistration}>
					<Textfield
						label='Your Name'
						type='Text'
						value={name}
						setValue={setName}
						required
					/>
					<Textfield
						label='Your Email'
						type='Email'
						value={email}
						setValue={setEmail}
						required
					/>
					<Textfield
						label='Your Password'
						type='Password'
						value={password}
						setValue={setPassword}
						required
					/>
					<CustomButton>Continue</CustomButton>
				</Form>
				<Row above={10} gap={10}>
					<T14 style={{ color: 'black' }}>Already have an account?</T14>
					<T14 style={{ color: 'blue' }} onClick={() => Navigate('/signin')}>
						Login
					</T14>
				</Row>
				{/* <Divider /> */}
			</Content>
		</Container>
	)
}

export default Register
