import { TextField } from '@mui/material'
import React from 'react'
import { CustomTextField } from './style'

interface ITextfield {
	type: 'Text' | 'Email' | 'Password'
	label: string
	required?: boolean
}
const Textfield = (p: ITextfield) => {
	const { type, label, required } = p

	return (
		<CustomTextField
			id='outlined-basic'
			label={label}
			variant='outlined'
			type={type}
			required={required}
		/>
	)
}

export default Textfield
