import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router'

import routers from 'routes'

import TopNav from './TopNav'
import Footer from './Footer'
import DevTools from './DevTools'

const App = () => (
	<div>
		<TopNav />
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
