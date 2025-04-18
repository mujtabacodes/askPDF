import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home2 from '@pages/homeDemo'
import Home from '@pages/home'
import Sigin from '@pages/signin'
import Register from '@pages/register'
import Dashboard from '@pages/dashboard'
import PrivateRoutes from './PrivateRoutes'
import Payment from '@components/Payment'

export default function Routing() {
	return (
		<Suspense>
			<Routes>
				<Route path='/demo' element={<Home2 />} />
				<Route path='/signin' element={<Sigin />} />
				<Route path='/register' element={<Register />} />
				<Route path='/payment' element={<Payment />} />
				<Route element={<PrivateRoutes />}>
					<Route path='/dashboard' element={<Dashboard />} />
				</Route>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</Suspense>
	)
}
