import { persistReducer, persistStore } from 'redux-persist'
import { PersistPartial } from 'redux-persist/lib/persistReducer'
import storage from 'redux-persist/lib/storage'

import mainSlice from '@mainSlice'
import { initMainState } from '@mainSlice/init'
import { MainState } from '@mainSlice/types'
import { combineReducers, configureStore, EmptyObject } from '@reduxjs/toolkit'
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { IAuthState } from './slices/auth/types'
import { initAuthState } from './slices/auth/init'
import authSlice from './slices/auth'
type MiddlewareGenerator = (
	getDefaultMiddleware: CurriedGetDefaultMiddleware<
		EmptyObject & {
			main: MainState
			auth: IAuthState
		} & PersistPartial
	>,
) => any[]

const persistConfig: any = {
	key: 'root',
	storage,
	migrate: (state: State) => {
		const { _persist = {} } = state || {}
		const main = { ...initMainState, ...(state?.main || {}) }
		const auth = { ...initAuthState, ...(state?.auth || {}) }
		return Promise.resolve({ _persist, main, auth })
	},
}

const rootReducer = combineReducers({
	main: mainSlice,
	auth: authSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const generateMiddleware: MiddlewareGenerator = def => {
	const ret = [...def({ serializableCheck: false })]
	// ret.push(someMiddleware)
	return ret
}

export const store = configureStore({
	reducer: persistedReducer,
	middleware: generateMiddleware,
})

export const persistor = persistStore(store)

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
