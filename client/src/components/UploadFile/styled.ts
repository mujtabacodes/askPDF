import Button from '@components/Button'
import styled from '@emotion/styled'
import { primaryColor } from '@styles/colors'
import { T16Bold } from '@styles/typo'

export const Container = styled.div`
	padding: 2rem 2rem;
	color: black;
	box-shadow: 0px 0px 15px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 70%;
	align-self: center;
`
export const Icon = styled.div`
	svg {
		font-size: 3rem;
	}
	svg > path {
		color: ${primaryColor};
	}
`
export const Heading = styled.h5`
	color: black;
`
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	input {
		color: black;
		margin-left: 2rem;
	}
`
export const styledButton = styled.button`
	width: fit-content;
	background: ${primaryColor};
	border: none;
	padding: 1rem 2rem;
	font-size: 1rem;
	border-radius: 2rem;
	cursor: pointer;
	:hover {
		background: opacity(0.9);
	}
`
export const Response = styled.div`
	background: wheat;
`
