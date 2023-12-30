import { useSelector } from 'react-redux'

import { MainState } from '@mainSlice/types'
import { State } from '@redux'
import { createSelector } from '@reduxjs/toolkit'
import { IAuthState } from '@redux/slices/auth/types'

type UseMainSlice = <T = unknown>(selector: (state: MainState) => T) => T
type UseAuthSlice = <T = unknown>(selector: (state: IAuthState) => T) => T

const main = (state: State) => state.main
const auth = (state: State) => state.auth

export const useMainSlice: UseMainSlice = selector =>
	useSelector(createSelector(main, selector))

export const useAuthSlice: UseAuthSlice = selector =>
	useSelector(createSelector(auth, selector))
