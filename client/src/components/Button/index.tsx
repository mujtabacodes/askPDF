import { forwardRef } from 'react'

import { IPos } from '@styles/util'

import { Container } from './styled'
import { T14BoldSpaced } from '@styles/typo'

export interface IButton extends IPos {
	children: React.ReactNode
	onClick?: () => void
	primary?: boolean
	type?: 'submit'
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
