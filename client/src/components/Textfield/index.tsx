import { TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { CustomTextField } from './style'
import { primaryColor } from '@styles/colors'

interface ITextfield {
	type: 'Text' | 'Email' | 'Password'
	value?: string
	setValue?: (value: string) => void
	label: string
	required?: boolean
	focused?: boolean
	onChange?: void
}
const Textfield = (p: ITextfield) => {
	const { type, label, required, value, setValue } = p
	const [internalValue, setInternalValue] = useState('')
	const text = value || internalValue
	const setText = setValue || setInternalValue
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value)
	}
	return (
		<CustomTextField
			id='outlined-basic'
			label={label}
			variant='outlined'
			type={type}
			required={required}
			fullWidth
			onChange={onChange}
		/>
	)
}

export default Textfield
