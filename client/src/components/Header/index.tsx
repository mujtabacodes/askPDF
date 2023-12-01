import { T14, T48Bold } from '@styles/typo'
import React from 'react'
import { Container, Description, NeonButton } from './styled'
import { Row } from '@styles/util'
import Button from '@components/Button'
import { SignInbtn } from '@components/Nav/styled'
import { useNavigate } from 'react-router-dom'
const Header = () => {
	const Navigate = useNavigate()
	const handleTryNow = () => {
		Navigate('/register')
	}
	return (
		<Container>
			<T48Bold>Chat With your PDF's</T48Bold>
			<Description above={20} below={50}>
				ChatGPT for PDF Files.
				<br /> Ask Questions & Get Answers Instantly.
			</Description>
			<Row gap={20}>
				<NeonButton onClick={handleTryNow}>Try Now</NeonButton>
				<Button>Show Video</Button>
			</Row>
		</Container>
	)
}

export default Header
