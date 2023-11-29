import { T14 } from '@styles/typo'
import React from 'react'
import { Container, Content, Logo, SignInbtn, Tab } from './styled'
import logoIMG from '@assets/images/logo-nobg.png'
import Button from '@components/Button'
import { Row } from '@styles/util'
import { IoIosArrowForward } from 'react-icons/io'
export interface INav {}
const Nav = () => {
	return (
		<Container>
			<Content>
				<Logo src={logoIMG} height={40} />
				<Row gap={16}>
					<Tab>Home</Tab>
					<Tab>Home</Tab>
				</Row>
				<SignInbtn onClick={() => alert('button click')}>
					<Row gap={4} align='center'>
						SignIn
						<IoIosArrowForward />
					</Row>
				</SignInbtn>
			</Content>
		</Container>
	)
}

export default Nav
