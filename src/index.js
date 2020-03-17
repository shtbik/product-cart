import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import App from 'containers/App'
import store from 'store'

import 'styles/index.scss'

const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL,
})

ReactDOM.render(
	<Provider store={store}>
		<Router history={syncHistoryWithStore(history, store)} basename={process.env.PUBLIC_URL}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
)
