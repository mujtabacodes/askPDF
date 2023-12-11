import styled from '@emotion/styled'
import List from '@mui/material/List'
import { drawerBG, navBG, primaryColor } from '@styles/colors'
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
