import React, { PropTypes } from 'react'
// import ReactDOM from 'react-dom'
// import Provider from './Provider'
import { Router } from 'react-router'
// import { Notifs } from 'redux-notifications'
// import auth from '../selectors/auth'
import { Provider } from 'react-redux'
import { AppRoutes, AuthRoutes, NoMatchRoute } from '../routes'
import DevTools from './DevTools'

export default class Root extends React.Component {

	static propTypes = {
		store: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
		history: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
	}

	render() {
		const { store, history } = this.props
		return (
			<Provider store={store}>
				<div>
					<Router history={history}>
						{AppRoutes}
						{AuthRoutes}
						{NoMatchRoute}
					</Router>
					<DevTools />
				</div>
			</Provider>
		)
	}
}
