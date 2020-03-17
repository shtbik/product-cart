import axios from 'axios'
import { SubmissionError } from 'redux-form'
import { cloneDeep } from 'lodash'

import { axiosDefaults } from 'configs/core'
import productsList from 'configs/products'

// CONSTANTS
export const LOAD_PRODUCTS_REQUEST = 'test/product/LOAD_PRODUCTS_REQUEST'
export const LOAD_PRODUCTS_RECEIVE = 'test/product/LOAD_PRODUCTS_RECEIVE'

export const FILTER_PRODUCTS_REQUEST = 'test/product/FILTER_PRODUCTS_REQUEST'
export const FILTER_PRODUCTS_RECEIVE = 'test/product/FILTER_PRODUCTS_RECEIVE'

// ACTIONS
const axiosInstance = axios.create(axiosDefaults)

// -------SYNC-------
export const receiveLoad = data => ({
	type: LOAD_PRODUCTS_RECEIVE,
	data,
	receivedAt: Date.now(),
})

export const receivefilterProducts = data => ({
	type: FILTER_PRODUCTS_RECEIVE,
	data,
	receivedAt: Date.now(),
})

// -------ASYNC-------
export function getProducts() {
	return dispatch => {
		return axiosInstance
			.get('/')
			.then(() => dispatch(receiveLoad(productsList)))
			.catch(() => {
				throw new SubmissionError({ _error: `bad_credentials` })
			})
	}
}

export function filterProductsFunc(newProducts) {
	return dispatch => dispatch(receivefilterProducts(newProducts))
}

// REDUCERS
const initialState = []
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_PRODUCTS_RECEIVE: {
			let copyState = cloneDeep(state)
			localStorage.setItem('initialProducts', JSON.stringify(action.data))
			copyState = action.data
			return copyState
		}

		case FILTER_PRODUCTS_RECEIVE: {
			let copyState = cloneDeep(state)
			copyState = action.data
			return copyState
		}

		default:
			return state
	}
}
