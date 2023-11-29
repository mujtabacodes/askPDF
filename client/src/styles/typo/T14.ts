import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { withPos } from '@styles/util'

export const T14CSS = css`
	margin: 0;
	min-height: 14px;
	line-height: 1;

	font-size: 14px;
	font-weight: normal;
`

export const T14 = withPos(styled.p`
	${T14CSS}
`)

export const T14BoldSpacedCSS = css`
	${T14CSS}
	font-weight: 600;

	letter-spacing: ${80 / 1000}em;
	text-transform: uppercase;
`

export const T14BoldSpaced = withPos(styled.p`
	${T14BoldSpacedCSS}
`)
