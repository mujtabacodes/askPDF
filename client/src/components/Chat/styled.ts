import styled from '@emotion/styled'
import { primaryColor } from '@styles/colors'

export const Container = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 4rem;
	/* background-color: whitesmoke; */
	background-color: orange;
	color: black;
	right: 5rem;
	top: 15;
	width: 40%;
	margin-right: 1rem;
	height: fit-content;
	border: 0.7rem solid ${primaryColor};
	border-radius: 3rem;
	padding: 2rem;
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
export const UserContainer = styled(BotContainer)``
export const UserText = styled(BotText)`
	background: lightgray;
`
export const UserIcon = styled(BotIcon)`
	font-size: 1.5rem;
`
export const InputContainer = styled.div`
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
	max-height: 600px; /* Set your desired height */
	overflow-y: auto; /* Add vertical scrollbar if content exceeds container height */
`
