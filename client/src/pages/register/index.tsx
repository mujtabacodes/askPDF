import Textfield from '@components/Textfield'
import { Container, Content, CustomButton, Form, Title } from './styled'
import Button from '@components/Button'
import SiginIMG from '@assets/images/signin.png'
import { T14, T48Bold } from '@styles/typo'
import Divider from '@components/Divider'
import { Row } from '@styles/util'
import { useNavigate } from 'react-router-dom'
const Register = () => {
	const Navigate = useNavigate()
	return (
		<Container>
			<Content>
				<Title below={20}>Create your account</Title>
				<Form>
					<Textfield label='Your Email' type='Email' required />
					<CustomButton>Continue</CustomButton>
				</Form>
				<Row above={10} gap={10}>
					<T14 style={{ color: 'black' }}>Already have an account?</T14>
					<T14 style={{ color: 'blue' }} onClick={() => Navigate('/signin')}>
						Login
					</T14>
				</Row>
				<Divider />
			</Content>
		</Container>
	)
}

export default Register
