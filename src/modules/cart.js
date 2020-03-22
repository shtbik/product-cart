import { find, filter, cloneDeep } from 'lodash'

export const ADD_PRODUCT_TO_CART = 'test/cart/ADD_PRODUCT_TO_CART'
export const CHANGE_CART_COUNT = 'test/cart/CHANGE_CART_COUNT'
export const DELETE_CART_ITEM = 'test/cart/DELETE_CART_ITEM'
export const CLEAR_CART = 'test/cart/CLEAR_CART'

// // ACTIONS
export const receiveAddCart = data => ({
	type: ADD_PRODUCT_TO_CART,
	data,
})

export const receiveChangeCartCount = data => ({
	type: CHANGE_CART_COUNT,
	data,
})

export const receiveDeleteCartItem = data => ({
	type: DELETE_CART_ITEM,
	data,
})

export const clearCart = () => ({
	type: CLEAR_CART,
})

export function addCart(product) {
	return dispatch => {
		dispatch(receiveAddCart(product))
	}
}

export function changeCartCount(newValue, productId) {
	return dispatch => {
		dispatch(receiveChangeCartCount({ newValue, productId }))
	}
}

export function deleteCartItem(productId) {
	return dispatch => {
		dispatch(receiveDeleteCartItem(productId))
	}
}

// REDUCERS
const initialState = []

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PRODUCT_TO_CART: {
			const nextState = cloneDeep(state)
			const { data } = action
			const existItem = find(nextState, { id: data.id })
			if (existItem) existItem.count = Number(existItem.count) + 1
			else {
				data.count = 1
				nextState.push(data)
			}
			return nextState
		}

		case CHANGE_CART_COUNT: {
			const nextState = cloneDeep(state)
			const { data } = action

			const thisProduct = find(nextState, { id: Number(data.productId) })
			if (thisProduct) {
				thisProduct.count = data.newValue
			}
			return nextState
		}

		case DELETE_CART_ITEM: {
			const nextState = cloneDeep(state)
			return filter(nextState, product => product.id !== Number(action.data))
		}

		case CLEAR_CART:
			return initialState

		default:
			return state
	}
}
