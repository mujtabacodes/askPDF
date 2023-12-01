import React from 'react'
import { Container } from './styled'
import { T14 } from '@styles/typo'

const Divider = () => {
	return (
		<Container>
			<div></div>
			<T14 style={{ color: 'black' }}>OR</T14>
			<div></div>
		</Container>
	)
}

export default Divider
