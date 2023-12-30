import Button from '@components/Button'
import styled from '@emotion/styled'
import { primaryColor } from '@styles/colors'
import { T18Bold, T48Bold } from '@styles/typo'

export const Container = styled.div`
	width: 100%;
	height: 100vh;
	padding: 10%;
`

export const Content = styled.div`
	position: fixed;

	display: flex;
	flex-direction: column;
	background: white;
	justify-content: center;
	align-items: center;
	width: 80%;
	/* height: 100%; */

	border: 3px solid ${primaryColor};
	border-radius: 1rem;

	padding: 2rem;
`
export const Title = styled(T48Bold)`
	font-size: 2rem;
	color: black;
`
export const CustomButton = styled(Button)`
	width: 100%;
`
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
`
