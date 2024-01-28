import Textfield from '@components/Textfield'
import {
	Container,
	Content,
	Form,
	HomeIcon,
	Image,
	LeftSide,
	RightSide,
	SignInBTN,
	Title,
} from './styled'
import Button from '@components/Button'
import SiginIMG from '@assets/images/signin.png'
import { useState } from 'react'
import axios from 'axios'
import { loginUser } from '@/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated, setUserData } from '@redux/slices/auth'
import { Row } from '@styles/util'
import { T14 } from '@styles/typo'
import { FaHouseDamage } from 'react-icons/fa'
import { HomeMiniRounded } from '@mui/icons-material'
import { IoMdArrowRoundBack } from 'react-icons/io'
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
					<HomeIcon onClick={() => Navigate('/')}>
						<IoMdArrowRoundBack />
					</HomeIcon>
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
						<SignInBTN primary>Submit</SignInBTN>
					</Form>
					<Row above={0} gap={10}>
						<T14 style={{ color: 'black' }}>Don't have account?</T14>
						<T14
							style={{ color: 'blue', cursor: 'pointer' }}
							onClick={() => Navigate('/register')}
						>
							Register
						</T14>
					</Row>
				</RightSide>
			</Content>
		</Container>
	)
}

export default Sigin
