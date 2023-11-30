import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home2 from '@pages/homeDemo'
import Home from '@pages/home'
import Sigin from '@pages/signin'

export default function Routing() {
	return (
		<Suspense>
			<Routes>
				<Route path='/demo' element={<Home2 />} />
				<Route path='/signin' element={<Sigin />} />
				<Route path='/' element={<Home />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</Suspense>
	)
}
