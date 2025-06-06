import Button from '@components/Button'
import styled from '@emotion/styled'
import { backgroundColor, primaryColor } from '@styles/colors'
import { T18 } from '@styles/typo'

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	height: 80%;
	justify-content: center;
`
export const Description = styled(T18)`
	font-size: 24px;
	opacity: 0.5;
`
export const NeonButton = styled(Button)`
	width: 10rem;
	border: none;
	outline: none;
	color: #fff;
	background: #111;
	cursor: pointer;
	position: relative;
	z-index: 0;
	border-radius: 10px;
	:before {
		content: '';
		background: linear-gradient(
			45deg,
			#ff0000,
			#ff7300,
			#fffb00,
			#48ff00,
			#00ffd5,
			#002bff,
			#7a00ff,
			#ff00c8,
			#ff0000
		);
		position: absolute;
		top: -2px;
		left: -2px;
		background-size: 400%;
		z-index: -1;
		filter: blur(5px);
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		animation: glowing 20s linear infinite;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		border-radius: 10rem;
	}
	:active {
		color: #000;
	}

	:before {
		opacity: 1;
	}
	:after {
		z-index: -1;
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: ${backgroundColor};
		left: 0;
		top: 0;
		border-radius: 10rem;
	}

	@keyframes glowing {
		0% {
			background-position: 0 0;
		}
		50% {
			background-position: 400% 0;
		}
		100% {
			background-position: 0 0;
		}
	}
`
