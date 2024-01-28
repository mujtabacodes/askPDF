import Button from '@components/Button'
import styled from '@emotion/styled'
import { primaryColor } from '@styles/colors'
import { T16Bold } from '@styles/typo'

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
	margin-top: 2rem;

	@media screen and (max-width: 768px) {
		display: none;
	}
`

export const Logo = styled.img``
export const SignInbtn = styled(Button)`
	:hover {
		background-color: rgba(100, 100, 100, 0.2);
	}

	background-color: rgba(100, 100, 100, 0.4);
	color: white;
`

export const Tab = styled(T16Bold)`
	list-style: none;
	padding-bottom: 0.5rem;
	cursor: pointer;
	position: relative;
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

export const MobileMenuIcon = styled.div``

export const MobileMenu = styled.div`
	display: none;
	/* background-color: red; */
	width: 100%;
	@media screen and (max-width: 768px) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem;
	}
`

export const ContentMobileView = styled.div`
	position: relative;

	display: flex;
	flex-direction: column;
	/* justify-content: flex-end; */
	align-items: flex-end;

	margin-top: 8rem;
	width: 50%;
	height: 10rem;
`
interface ISideNav {
	isOpen: boolean
}
export const SideNav = styled.div<ISideNav>`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	background-color: white;
	width: fit-content;
	padding: 1rem 1rem;
	border-radius: 1rem;
	opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
	transition: opacity 1s ease-in-out;

	pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
	z-index: ${({ isOpen }) => (isOpen ? 1 : -1)};
`
export const SideNavLink = styled.h2`
	color: ${primaryColor};
	border-bottom: 1px solid ${primaryColor};
`
