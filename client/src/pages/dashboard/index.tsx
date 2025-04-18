import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { dashboardBG, drawerBG, navBG } from '@styles/colors'
import { DrawerToggle, Logo, StyledBox, StyledList, WelcomeTitle } from './styled'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SelectAllIcon from '@mui/icons-material/SelectAll'
import LogoIMG from '@assets/images/logo-nobg.png'
import MyAccount from '@components/MyAccount'
import ChooseMultipleFiles from '@components/ChooseMultipleFiles'
import UploadFile from '@components/UploadFile'
import { useNavigate } from 'react-router-dom'
import { T16 } from '@styles/typo'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated } from '@redux/slices/auth'
import { useAuthSlice } from '@redux/hooks'
import SelectFiles from '@components/SelectFiles'
const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}
interface IUserDetails {
	name: string
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
)
type IconMapType = {
	[key in 'Select Files' | 'Upload File' | 'Choose Multiple files']: React.ReactElement // Index signature for arbitrary string keys
}
export default function Dashboard() {
	const theme = useTheme()
	const [open, setOpen] = React.useState(false)
	const [selectedItem, setSelectedItem] = React.useState('Select Files')
	const Navigate = useNavigate()
	const dispatch = useDispatch()
	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const renderComponent = (selected: any) => {
		switch (selected) {
			case 'Select Files':
				return <SelectFiles />
			case 'Upload File':
				return <UploadFile />
			case 'Choose Multiple files':
				return <ChooseMultipleFiles />
			default:
				return null
		}
	}

	const iconMap: IconMapType = {
		'Select Files': <InboxIcon />,
		'Upload File': <CloudUploadIcon />,
		'Choose Multiple files': <SelectAllIcon />,
	}
	const handleListItemClick = (text: string): void => {
		setSelectedItem(text)
	}
	const handleLogout = () => {
		Navigate('/')
		dispatch(setIsAuthenticated(false))
	}
	const userDetails = useAuthSlice(e => e.userData) as IUserDetails
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<Drawer variant='permanent' open={open} style={{ background: `${drawerBG}` }}>
					<Divider style={{ background: `${drawerBG}` }} />

					<StyledList>
						<div>
							{/* <Logo src={LogoIMG} /> */}

							{['Select Files', 'Upload File', 'Choose Multiple files'].map(
								(text, index) => (
									<ListItem key={text} disablePadding sx={{ display: 'block' }}>
										<ListItemButton
											onClick={() => handleListItemClick(text)}
											sx={{
												minHeight: 48,
												justifyContent: open ? 'initial' : 'center',
												px: 2.5,
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: open ? 3 : 'auto',
													justifyContent: 'center',
												}}
											>
												{/* {iconMap[text ]} */}
												{iconMap[text as keyof IconMapType]}
											</ListItemIcon>
											<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
										</ListItemButton>
									</ListItem>
								),
							)}
							<Divider />
						</div>
						{/* <MyAccount drawerStatus={open} /> */}
						<T16 onClick={handleLogout} style={{ cursor: 'pointer' }}>
							Logout
						</T16>
					</StyledList>
				</Drawer>
				<DrawerToggle style={{ background: `${dashboardBG}` }}>
					{!open ? (
						<IconButton
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{
								marginRight: 0,
								background: `${dashboardBG}`,
							}}
						>
							<ChevronRightIcon className='drawertoggle' />
						</IconButton>
					) : (
						<IconButton
							onClick={handleDrawerClose}
							aria-label='open drawer'
							edge='start'
							sx={{
								marginRight: 0,
								background: `${dashboardBG}`,
							}}
						>
							<ChevronLeftIcon className='drawertoggle' />
						</IconButton>
					)}
				</DrawerToggle>
			</Box>
			<StyledBox>
				{/* <DrawerHeader /> */}
				<WelcomeTitle above={20} below={10}>
					WELCOME
					{` ${(userDetails?.name).toUpperCase()}`}
				</WelcomeTitle>
				{selectedItem && renderComponent(selectedItem)}
			</StyledBox>
		</>
	)
}
