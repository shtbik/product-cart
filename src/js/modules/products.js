import axios from 'axios'
// import _ from 'lodash'
import { SubmissionError } from 'redux-form'
// import { browserHistory } from 'react-router'

// import { axiosDefaults, core as coreConfig } from '../configs/core'
import { axiosDefaults } from '../configs/core'
import { products_list } from '../configs/products'

// CONSTANTS
export const LOAD_PRODUCTS_REQUEST = 'test/product/LOAD_PRODUCTS_REQUEST'
export const LOAD_PRODUCTS_RECEIVE = 'test/product/LOAD_PRODUCTS_RECEIVE'

// ACTIONS
const axiosInstance = axios.create(axiosDefaults)

// -------SYNC-------
export const receiveLoad = ( data ) => ({type: LOAD_PRODUCTS_RECEIVE, data, receivedAt: Date.now()})
export const requestLoad = ( params ) => ({type: LOAD_PRODUCTS_REQUEST, params})


// -------ASYNC-------
// _POST
export function getProducts() {
	// console.log(products_list)
	return ( dispatch ) => {
		// console.log('Load products')
		return axiosInstance.get('/get').then(( res ) => {
			console.log(res)
			dispatch(receiveLoad(products_list))
			// browserHistory.push('/')
		}).catch(( res ) => {
			console.log(res)
			throw new SubmissionError({ _error: `bad_credentials` })
		})
	}
}

// REDUCERS
const initialState = []
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_PRODUCTS_RECEIVE:
			const copyState = action.data
			// console.log('copyState: ', copyState)
			return copyState

		default:
			return state
	}
}
