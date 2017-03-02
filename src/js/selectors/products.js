import _ from 'lodash'
import store from '../store'

// Используется в роутах, как проверка юзера на логин
const products = {
	loadProducts() {
		const state = store.getState()
		const productsInStore = _.get(state, 'products')
		return (productsInStore && productsInStore.length)
	},

	getProducts() {
		// console.log(!products.loadProducts())
		if (!products.loadProducts()) {
			console.log('sd')
			// replace({
			// 	pathname: '/error',
			// 	state: { nextPathname: nextState.location.pathname }
			// })
		}
	}
}

export default products
export { products }
