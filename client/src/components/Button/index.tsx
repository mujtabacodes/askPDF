import { forwardRef } from 'react'

import { T14BoldSpaced } from '@styles/typo'
import { IPos } from '@styles/util'

import { Container } from './styled'

export interface IButton extends IPos {
	children: React.ReactNode
	onClick?: () => void
	white?: boolean
}

const Button = forwardRef<HTMLButtonElement, IButton>((p, ref) => {
	const { children, ...props } = p

	return (
		<Container {...props} ref={ref}>
			<T14BoldSpaced white>{children}</T14BoldSpaced>
		</Container>
	)
})

export default Button
