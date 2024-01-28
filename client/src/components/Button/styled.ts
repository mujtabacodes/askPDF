import styled from '@emotion/styled'
import { lightSlateGray, primaryColor, vividCerulean } from '@styles/colors'
import { withPos } from '@styles/util'

interface IButton {
	primary?: boolean
}

export const Container = withPos(styled.button<IButton>`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 1.3rem 2rem;
	border-radius: 10rem;
	border: none;

	background-color: ${p => (p.primary ? primaryColor : 'rgba(100, 100, 100, 0.4)')};

	cursor: pointer;

	outline: 2px solid transparent;
	transition: all 0.2s ease-in-out;

	:focus-visible {
		outline: 2px solid ${lightSlateGray}88; // 0x88 = 50% opacity
		/* box-shadow: 0 10px 20px ${vividCerulean}33; // 0x33 = 20% opacity */
	}

	/* ${p => (p.primary ? `p{color: ${lightSlateGray}}` : 'white')} */
	color: ${p => (p.primary ? 'white' : `${lightSlateGray}`)};
`)
