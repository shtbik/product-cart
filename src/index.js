import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserHistory } from 'history'

import App from 'containers/App'
import { store, persistor } from './store'
import 'styles/index.scss'

const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL,
})

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router history={syncHistoryWithStore(history, store)} basename={process.env.PUBLIC_URL}>
				<App />
			</Router>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)
