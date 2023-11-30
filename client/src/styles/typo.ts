import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { withPos } from './util'
// 14
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

export const T16 = withPos(styled.p`
	${T14CSS}
	font-size: 16px;
`)
export const T16Bold = withPos(styled.p`
	${T14CSS}
	font-size: 16px;
	font-weight: 600;
`)

export const T14Bold = withPos(styled.p`
	${T14CSS}
	font-weight: 600;
`)
export const T18 = withPos(styled.p`
	${T14CSS}
	font-size: 18px;
`)
export const T18Bold = withPos(styled.p`
	${T14CSS}
	font-size: 18px;
	font-weight: 600;
`)
// T48
export const T48Bold = withPos(styled.h1`
	margin: 0;
	min-height: 48px;
	line-height: 1;

	font-size: 48px;
	font-weight: 600;
`)
