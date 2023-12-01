import React from 'react'
import Lottie, { useLottie } from 'lottie-react'
import data from '@assets/json/sigin.json'

export default function SiginLottie() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: data,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}
	const options = {
		animationData: data,
		loop: true,
	}

	const { View } = useLottie(options)
	return <>{View}</>
}
