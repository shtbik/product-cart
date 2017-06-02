import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { AppRoutes, NoMatchRoute } from '../routes'

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
				</div>
			</Provider>
		)
	}
}
