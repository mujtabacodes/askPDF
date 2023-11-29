import { css } from '@emotion/react'

import { chineseBlack } from './colors'

export default css`
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

	html {
		min-height: 100%;
		overflow-y: scroll;
		display: flex;
		-webkit-overflow-scrolling: touch;
	}

	body {
		display: flex;
		max-width: 100%;
		flex-grow: 1;
		margin: 0;
		font-family: 'Inter', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		user-select: none;
	}

	#root {
		display: flex;
		max-width: 100%;
		flex-grow: 1;
	}

	* {
		box-sizing: border-box;
		color: ${chineseBlack};
	}
`
