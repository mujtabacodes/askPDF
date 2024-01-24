import styled from '@emotion/styled'
import { Box } from '@mui/material'
import List from '@mui/material/List'
import { dashboardBG, drawerBG, navBG, primaryColor } from '@styles/colors'
import { T16Bold, T48Bold } from '@styles/typo'
export const DrawerToggle = styled.div`
	display: flex;
	justify-content: center;
	.drawertoggle {
		color: black !important;
		background-color: ${primaryColor};
		border-bottom-right-radius: 100%;
		border-top-right-radius: 100%;
	}
	.drawertoggle:hover {
		transform: scale(1.2);
	}
`
export const StyledList = styled(List)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: ${drawerBG};
	height: 100%;
`
export const Logo = styled.img`
	background: whitesmoke;

	margin: 2rem 0.3rem;
	border: 1px solid white;
	padding: 1rem;
	border-radius: 12rem;
	height: 80px;
`
export const WelcomeTitle = styled(T16Bold)`
	font-size: 2rem;
	font-weight: 900;
	color: ${primaryColor};
	border-radius: 1rem;

	@media (max-width: 375px) {
		font-size: 1.3rem;
	}
`

export const StyledBox = styled.div`
	padding-top: 2rem;
	background: ${dashboardBG};
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`
