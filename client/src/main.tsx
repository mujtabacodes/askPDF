import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { Global } from '@emotion/react'
import { persistor, store } from '@redux'
import styles from '@styles/global'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<Global styles={styles} />
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
)
