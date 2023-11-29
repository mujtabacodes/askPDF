import styled from '@emotion/styled'
import { lightSlateGray, vividCerulean } from '@styles/colors'
import { withPos } from '@styles/util'

interface IButton {
	white?: boolean
}

export const Container = withPos(styled.button<IButton>`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 20px 30px;

	border-radius: 8px;
	border: none;

	background-color: ${p => (p.white ? 'white' : vividCerulean)};

	cursor: pointer;

	outline: 2px solid transparent;
	transition: all 0.2s ease-in-out;

	:focus-visible {
		outline: 2px solid ${lightSlateGray}88; // 0x88 = 50% opacity
		/* box-shadow: 0 10px 20px ${vividCerulean}33; // 0x33 = 20% opacity */
	}

	${p => (p.white ? `p{color: ${lightSlateGray}}` : 'white')}
`)
