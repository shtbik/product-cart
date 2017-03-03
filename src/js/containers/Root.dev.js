import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { AppRoutes, NoMatchRoute } from '../routes'
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
						{NoMatchRoute}
					</Router>
					<DevTools />
				</div>
			</Provider>
		)
	}
}
