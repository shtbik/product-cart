import { cloneDeep } from 'lodash'

import productsList from 'configs/products'

// CONSTANTS
export const LOAD_PRODUCTS = 'test/product/LOAD_PRODUCTS'
export const FILTER_PRODUCTS = 'test/product/FILTER_PRODUCTS'

// ACTIONS
export const receiveLoad = data => ({
	type: LOAD_PRODUCTS,
	data,
	receivedAt: Date.now(),
})

export const receivefilterProducts = data => ({
	type: FILTER_PRODUCTS,
	data,
	receivedAt: Date.now(),
})

export function getProducts() {
	// TODO: add real data
	return dispatch => setTimeout(() => dispatch(receiveLoad(productsList)), 2000)
}

export function filterProductsFunc(newProducts) {
	return dispatch => dispatch(receivefilterProducts(newProducts))
}

// REDUCERS
const initialState = []

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_PRODUCTS: {
			let copyState = cloneDeep(state)
			localStorage.setItem('initialProducts', JSON.stringify(action.data))
			copyState = action.data
			return copyState
		}

		case FILTER_PRODUCTS: {
			let copyState = cloneDeep(state)
			copyState = action.data
			return copyState
		}

		default:
			return state
	}
}
