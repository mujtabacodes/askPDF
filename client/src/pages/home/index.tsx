import Header from '@components/Header'
import Nav from '@components/Nav'
import React from 'react'
import { Container } from './styled'
import Payment from '@components/Payment'
const Home = () => {
	return (
		<Container>
			<Nav />
			<Payment />
			<Header />
		</Container>
	)
}

export default Home
