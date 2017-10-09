import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from '../containers/App'
import Catalog from '../containers/Catalog'
import Cart from '../containers/Cart'

import NoMatch from '../components/NoMatch'

// import { products } from '../selectors/products'
// <Route path="/" component={App} onEnter={authFunc.requireAuth}>
const AppRoutes = (
	<Route path="/" component={App}>
		<IndexRoute component={Catalog} />
		<Route path="cart" component={Cart} />
	</Route>
)

const NoMatchRoute = (<Route path="*" component={NoMatch}/>)

export { AppRoutes, NoMatchRoute }
