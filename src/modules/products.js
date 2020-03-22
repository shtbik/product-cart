import { cloneDeep, merge } from 'lodash'

import productsList from 'configs/products'

// CONSTANTS
export const LOAD_PRODUCTS = 'test/product/LOAD_PRODUCTS'
export const FILTER_PRODUCTS = 'test/product/FILTER_PRODUCTS'
export const INITIAL_PRODUCTS_KEY = 'initialProductsList'

// ACTIONS
export const loadAction = data => ({
	type: LOAD_PRODUCTS,
	data,
})

export const filterAction = data => ({
	type: FILTER_PRODUCTS,
	data,
})

export function getProducts() {
	// TODO: add real data
	return dispatch =>
		setTimeout(() => {
			localStorage.setItem(INITIAL_PRODUCTS_KEY, JSON.stringify(productsList))
			dispatch(loadAction({ data: productsList }))
		}, 2000)
}

export function filterProducts({ products, filter }) {
	return dispatch => dispatch(filterAction({ data: products, filter }))
}

// REDUCERS
const initialState = {
	data: [],
	filter: 'all',
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_PRODUCTS: {
			let nextState = cloneDeep(state)
			nextState = merge(nextState, action.data)
			return nextState
		}

		case FILTER_PRODUCTS: {
			return action.data
		}

		default:
			return state
	}
}
