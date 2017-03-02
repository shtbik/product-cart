// import axios from 'axios'
import _ from 'lodash'
// import { SubmissionError } from 'redux-form'
import { browserHistory } from 'react-router'

// import { axiosDefaults, core as coreConfig } from '../configs/core'
// import { axiosDefaults } from '../configs/core'
// import { products_list } from '../configs/products'

// CONSTANTS
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
// export const requestAddCart = ( params ) => ({type: ADD_CART_REQUEST, params})


// -------ASYNC-------
// _POST
export function addCart(product) {
	return ( dispatch ) => {
		// console.log(product)
		dispatch(receiveAddCart(product))
		browserHistory.push('/')
	}
}

export function changeCartCount(newValue, productId) {
	return ( dispatch ) => {
		// console.log(product)
		dispatch(receiveChangeCartCount({newValue, productId}))
		// browserHistory.push('/')
	}
}

export function deleteCartItem(productId) {
	return ( dispatch ) => {
		// console.log(product)
		dispatch(receiveDeleteCartItem(productId))
		// browserHistory.push('/')
	}
}

// REDUCERS
const initialState = []
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_CART_RECEIVE:
			let cloneArray = state.slice(0)
			const isExist = _.find(cloneArray, {id: action.data.id})
			if (isExist) {
				isExist.count++
			} else {
				action.data.count = 1
				cloneArray.push(action.data)
			}
			// console.log(action.data)
			// console.log(state.push(action.data))
			// Object.assign({}, state, action.data)
			return cloneArray

		case CHANGE_CART_COUNT_RECEIVE:
			cloneArray = state.slice(0)
			const thisProduct = _.find(cloneArray, {'id': Number(action.data.productId)})
			if (thisProduct) {
				thisProduct.count = Number(action.data.newValue)
			}
			// console.log(action.data.productId, thisProduct, state)
			return cloneArray

		case DELETE_CART_ITEM_RECEIVE:
			cloneArray = state.slice(0)
			// console.log(cloneArray)
			return _.filter(cloneArray, function(item) {
				return item.id !== Number(action.data)
			})

		default:
			return state
	}
}
