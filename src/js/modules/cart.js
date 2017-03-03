import _ from 'lodash'

export const ADD_CART_REQUEST = 'test/cart/ADD_CART_REQUEST'
export const ADD_CART_RECEIVE = 'test/cart/ADD_CART_RECEIVE'

export const CHANGE_CART_COUNT_REQUEST = 'test/cart/CHANGE_CART_COUNT_REQUEST'
export const CHANGE_CART_COUNT_RECEIVE = 'test/cart/CHANGE_CART_COUNT_RECEIVE'

export const DELETE_CART_ITEM_REQUEST = 'test/cart/DELETE_CART_ITEM_REQUEST'
export const DELETE_CART_ITEM_RECEIVE = 'test/cart/DELETE_CART_ITEM_RECEIVE'

// // ACTIONS
// const axiosInstance = axios.create(axiosDefaults)

// -------SYNC-------
export const receiveAddCart = ( data ) => ({
	type: ADD_CART_RECEIVE,
	data,
	receivedAt: Date.now()
})

export const receiveChangeCartCount = ( data ) => ({
	type: CHANGE_CART_COUNT_RECEIVE,
	data,
	receivedAt: Date.now()
})

export const receiveDeleteCartItem = ( data ) => ({
	type: DELETE_CART_ITEM_RECEIVE,
	data,
	receivedAt: Date.now()
})

// -------ASYNC-------
export function addCart(product) {
	return ( dispatch ) => {
		dispatch(receiveAddCart(product))
	}
}

export function changeCartCount(newValue, productId) {
	return ( dispatch ) => {
		dispatch(receiveChangeCartCount({newValue, productId}))
	}
}

export function deleteCartItem(productId) {
	return ( dispatch ) => {
		dispatch(receiveDeleteCartItem(productId))
	}
}

// REDUCERS
const initialState = []
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_CART_RECEIVE:
			let cloneState = state.slice(0)
			const isExist = _.find(cloneState, {id: action.data.id})
			if (isExist) {
				isExist.count++
			} else {
				action.data.count = 1
				cloneState.push(action.data)
			}
			return cloneState

		case CHANGE_CART_COUNT_RECEIVE:
			cloneState = state.slice(0)
			const thisProduct = _.find(cloneState, {'id': Number(action.data.productId)})
			if (thisProduct) {
				thisProduct.count = Number(action.data.newValue)
			}
			return cloneState

		case DELETE_CART_ITEM_RECEIVE:
			cloneState = state.slice(0)
			return _.filter(cloneState, function(item) {
				return item.id !== Number(action.data)
			})

		default:
			return state
	}
}
