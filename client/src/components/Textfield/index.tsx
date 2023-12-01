import { TextField } from '@mui/material'
import React from 'react'
import { CustomTextField } from './style'
import { primaryColor } from '@styles/colors'

interface ITextfield {
	type: 'Text' | 'Email' | 'Password'
	label: string
	required?: boolean
	focused?: boolean
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
			fullWidth
		/>
	)
}

export default Textfield
