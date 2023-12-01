import Textfield from '@components/Textfield'
import { Container, Content, Image, LeftSide, RightSide, Title } from './styled'
import Button from '@components/Button'
import SiginIMG from '@assets/images/signin.png'

const Register = () => {
	return (
		<Container>
			<Content>
				<LeftSide>
					<Image src={SiginIMG} />
				</LeftSide>
				<RightSide>
					<Title>Sign in to Account</Title>
					<form>
						<Textfield label='Enter Name' type='Text' required />
						<Textfield label='Enter Password' type='Password' required />
						<Button>Submit</Button>
					</form>
				</RightSide>
			</Content>
		</Container>
	)
}

export default Register
