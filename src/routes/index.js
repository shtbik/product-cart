import Catalog from 'containers/Catalog'
import Cart from 'containers/Cart'
import NoMatch from 'components/NoMatch'

export default [
	{
		path: '/',
		component: Catalog,
		exact: true,
	},
	{
		path: '/cart',
		component: Cart,
		exact: true,
	},
	{
		path: '*',
		component: NoMatch,
		exact: true,
	},
]
