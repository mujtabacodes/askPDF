import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { primaryColor } from '@styles/colors'
export const CustomTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: `${primaryColor}`,
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#B2BAC2',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: '#E0E3E7',
		},
		'&:hover fieldset': {
			borderColor: '#B2BAC2',
		},
		'&.Mui-focused fieldset': {
			borderColor: `${primaryColor}`,
		},
	},
})
