import { createSlice } from '@reduxjs/toolkit'
import { initAuthState } from './init'

const AuthSlice = createSlice({
	name: 'auth',
	initialState: initAuthState,
	reducers: {
		setIsAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload
		},
	},
})

export const { setIsAuthenticated } = AuthSlice.actions
export default AuthSlice.reducer
