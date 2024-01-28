import Button from '@components/Button'
import styled from '@emotion/styled'

export const Container = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`
export const styleButton = styled(Button)`
	svg {
		font-size: 1rem;
		margin-right: 0.2rem;
	}
`
