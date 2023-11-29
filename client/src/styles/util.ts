import { Theme } from '@emotion/react'
import styled, { StyledComponent } from '@emotion/styled'

import { chineseBlack } from './colors'

export interface IPos {
	textAlign?: 'left' | 'right' | 'center' | 'justify'
	alignSelf?: 'center' | 'flex-start' | 'flex-end'
	above?: number
	below?: number
	black?: boolean
	white?: boolean
}

interface IRow extends IPos {
	justify?: 'center' | 'flex-end' | 'flex-start' | 'space-between'
	align?: 'center' | 'flex-end' | 'flex-start'
	gap?: number
}

type Styled<T, U> = StyledComponent<
	{
		theme?: Theme | undefined
		as?: React.ElementType<any> | undefined
	} & U,
	React.DetailedHTMLProps<React.HTMLAttributes<T>, T>,
	{}
>

export const withPos = <T, U>(e: Styled<T, U>) =>
	styled(e)<IPos>`
		text-align: ${p => (p.textAlign ? p.textAlign : 'center')};
		align-self: ${p => (p.alignSelf ? p.alignSelf : 'center')};
		margin-top: ${p => (p.above ? p.above : 0)}px;
		margin-bottom: ${p => (p.below ? p.below : 0)}px;
		${p => (p.black ? `color: ${chineseBlack};` : '')}
		${p => (p.white ? `color: white;` : '')}
	`

export const Row = withPos(styled.div<IRow>`
	display: flex;
	flex-direction: row;
	align-items: ${p => (p.align ? p.align : 'center')};
	justify-content: ${p => (p.justify ? p.justify : 'center')};
	gap: ${p => (p.gap ? p.gap : '0')}px;

	width: 100%;
`)
