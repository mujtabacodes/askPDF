import Textfield from '@components/Textfield'
import React from 'react'
import { Container } from './styled'
import { FormControl } from '@mui/material'

const Sigin = () => {
	return (
		<Container>
			<form>
				<Textfield type='Text' label='Enter your name' />
				<Textfield type='Email' label='Enter your name' required />
				<button type='submit'>SUb</button>
			</form>
		</Container>
	)
}

export default Sigin
