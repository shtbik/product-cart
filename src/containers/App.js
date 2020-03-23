import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router'

import routers from 'routes'

import Footer from 'components/Footer'
import DevTools from 'components/DevTools'
import NavBar from './NavBar'

const App = () => (
	<div>
		<NavBar />
		<div className="container main-container">
			<Switch>
				{routers.map(({ component: Component, exact, path }) => (
					<Route key={path} path={path} exact={exact} component={Component} />
				))}
			</Switch>
		</div>
		<Footer />

		{process.env.NODE_ENV !== 'production' && <DevTools />}
	</div>
)

export default App
