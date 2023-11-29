import { useSelector } from 'react-redux'

import { MainState } from '@mainSlice/types'
import { State } from '@redux'
import { createSelector } from '@reduxjs/toolkit'

type UseMainSlice = <T = unknown>(selector: (state: MainState) => T) => T

const main = (state: State) => state.main

export const useMainSlice: UseMainSlice = selector =>
	useSelector(createSelector(main, selector))
