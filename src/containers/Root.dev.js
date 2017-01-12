import React from 'react'
import ReactDOM from 'react-dom'
// import Provider from './Provider'
import { Router, Route, IndexRoute } from 'react-router'
// import { Notifs } from 'redux-notifications'
import App from './App'
// import auth from '../selectors/auth'
import Home from './Home'

import {connect, Provider} from 'react-redux'
// import { AppRoutes, NoMatchRoute, AuthRoutes } from '../routes'
//import DevTools from './DevTools'

export default class Root extends React.Component {
	render() {
		const { store, history } = this.props
		return (
			<Provider store={store}>
				<div>
					<Router history={history}>
						<Route path="/" component={App}>
							<IndexRoute component={Home}/>
						</Route>
						{ /* {AppRoutes}
						{AuthRoutes}
						{NoMatchRoute} */ }
					</Router>
				</div>		
			</Provider>
		)
	}
}