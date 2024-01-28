import React, { useState } from 'react'
import {
	Container,
	Content,
	ContentMobileView,
	Logo,
	MobileMenu,
	MobileMenuIcon,
	SideNav,
	SideNavLink,
	SignInbtn,
	Tab,
} from './styled'
import { useNavigate } from 'react-router-dom'
import logoIMG from '@assets/images/logo-nobg.png'
import Button from '@components/Button'
import { Row } from '@styles/util'
import { IoIosArrowForward, IoIosClose, IoIosMenu } from 'react-icons/io'
import { Divide as Hamburger } from 'hamburger-react'
import { primaryColor } from '@styles/colors'
export interface INav {}
const Nav = () => {
	const [isOpen, setOpen] = useState(false)

	const Navigate = useNavigate()

	return (
		<Container>
			<Content>
				<Logo src={logoIMG} height={40} />
				<Row gap={16}>
					<Tab>About</Tab>
					<Tab>Faq</Tab>
				</Row>
				<SignInbtn onClick={() => Navigate('/signin')}>
					<Row gap={4} align='center'>
						SignIn
						<IoIosArrowForward />
					</Row>
				</SignInbtn>
			</Content>

			{/* Mobile View */}
			<MobileMenu>
				<Logo src={logoIMG} height={40} />
				<ContentMobileView>
					<div>
						<Hamburger toggled={isOpen} toggle={setOpen} />
					</div>
					{isOpen ? (
						<SideNav isOpen={isOpen}>
							<SideNavLink>About</SideNavLink>
							<SideNavLink>Faq</SideNavLink>
							<Button primary white onClick={() => Navigate('/signin')}>
								<Row gap={4} align='center'>
									SignIn
									<IoIosArrowForward />
								</Row>
							</Button>
						</SideNav>
					) : (
						''
					)}
				</ContentMobileView>
			</MobileMenu>
		</Container>
	)
}

export default Nav
