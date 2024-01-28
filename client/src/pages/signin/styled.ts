import Button from '@components/Button'
import styled from '@emotion/styled'
import { primaryColor } from '@styles/colors'
import { T18Bold } from '@styles/typo'

export const Container = styled.div`
	width: 100%;
	height: 100vh;
	padding: 10%;
`

export const Content = styled.div`
	display: flex;
	flex-direction: row;

	justify-content: space-between;
	background-color: ${primaryColor};

	height: 100%;

	box-shadow: inset;

	border: 3px solid ${primaryColor};
	border-radius: 2rem;

	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`

export const LeftSide = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	@media screen and (max-width: 768px) {
		width: 100%;
		height: 50%;
		flex-direction: column;
	}
`

export const RightSide = styled(LeftSide)`
	flex-direction: column;
	background-color: white;
	border-top-right-radius: 2rem;
	border-bottom-right-radius: 2rem;

	@media screen and (max-width: 768px) {
		border-top-right-radius: 0rem;
		border-bottom-right-radius: 2rem;
		border-bottom-left-radius: 2rem;
		height: fit-content;
		padding: 2rem 0;
	}
`

export const Title = styled(T18Bold)`
	color: ${primaryColor};
	font-weight: 800;
`

export const Image = styled.img`
	width: 100%;
	height: auto;

	@media screen and (max-width: 768px) {
		width: 80%;
	}
`
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	padding: 2rem 2rem 0.5rem 2rem;
`
export const SignInBTN = styled(Button)`
	width: 100%;
`
export const HomeIcon = styled.h1`
	position: absolute;
	left: 0;
	top: 0;
	margin-left: 1rem;
	cursor: pointer;
`
