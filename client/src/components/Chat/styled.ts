import styled from '@emotion/styled'
import { primaryColor } from '@styles/colors'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 0rem;
	min-height: 80vh;
	@media (min-width: 540px) {
		padding: 2rem;
		margin: 0 10%;
	}
`
export const BotContainer = styled.div`
	display: flex;
	gap: 1rem;
`
export const BotIcon = styled.div`
	font-size: 2rem;
	svg path {
		color: black !important;
	}
`
export const BotText = styled.div`
	color: black;
	background: lightblue;
	padding: 1rem;
	border-radius: 0.5rem;
`
export const UserContainer = styled(BotContainer)`
	justify-content: end;
`
export const UserText = styled(BotText)`
	background: lightgray;
`
export const UserIcon = styled(BotIcon)`
	font-size: 1.5rem;
`
export const InputContainer = styled.form`
	display: flex;
	width: 100%;

	border: 1px solid ${primaryColor};
	border-radius: 2.5rem;
`
export const Input = styled.input`
	width: 100%;
	background: transparent;
	border: none;
	padding: 1rem 2rem;
	color: black;
	font-size: 1rem;
	:active {
		outline: none;
	}
	:focus {
		outline: none;
	}
`
export const SendMessageIcon = styled.div``
export const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding-right: 1rem;
	margin-bottom: 1rem;
	max-height: 70vh;
	@media (max-width: 525px) {
		max-height: 600px;
		/* margin: 0; */
	}
	overflow-y: auto; /* Add vertical scrollbar if content exceeds container height */
`
