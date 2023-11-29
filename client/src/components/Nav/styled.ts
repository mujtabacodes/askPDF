import Button from '@components/Button'
import styled from '@emotion/styled'
import { primaryColor } from '@styles/colors'
import { withPos } from '@styles/util'

interface INav {}

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	/* background: red; */
	width: 100%;
	height: 10vh;
`

export const Content = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 80%;

	padding: 2rem;
`

export const Logo = styled.img``
export const SignInbtn = styled(Button)`
	:hover {
		background-color: rgba(100, 100, 100, 0.2);
	}

	background-color: rgba(100, 100, 100, 0.4);
	color: white;
`

export const Tab = styled.li`
	list-style: none;
	cursor: pointer;
	position: relative; /* Required for absolute positioning of the border */
	transition: background-color 0.3s ease-in-out;

	&:hover {
		&:after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			width: 0;
			height: 1px;
			background-color: ${primaryColor};
			transition: width 0.3s ease-in-out;
			z-index: 1; /* Ensure it's above the li content */
		}
	}

	&:hover:after {
		width: 100%;
	}
`
