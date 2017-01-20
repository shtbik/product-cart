// import _ from 'lodash'
import axios from 'axios'
import { SubmissionError } from 'redux-form'
import { browserHistory } from 'react-router'

import { axiosDefaults } from '../configs/core'

// CONSTANTS
export const TEST_REQUEST = 'doalloc/tests/TEST_REQUEST'
export const TEST_RECEIVE = 'doalloc/tests/TEST_RECEIVE'

// ACTIONS
const axiosInstance = axios.create(axiosDefaults)

// -------SYNC-------
export const receiveTest = ( data ) => ({type: TEST_RECEIVE, data, receivedAt: Date.now()})
export const requestTest = ( params ) => ({type: TEST_REQUEST, params})

// -------ASYNC-------
// _POST
export function postTest( req, dispatch ) {
	console.log('Отправка данных на сервер: ', + req)
	return axiosInstance.post('/test', {data: req}).then(( res ) => {
		console.log(res)
		dispatch(receiveTest(res.data))
		browserHistory.push('/mark')
	}).catch(( res ) => {
		console.log(res)
		throw new SubmissionError({ _error: `bad_credentials` })
	})
}

export function getTest( req, dispatch ) {
	return axiosInstance.get('/test', {data: req}).then(( res ) => {
		console.log(res)
		dispatch(receiveTest(res.data))
	}).catch(( res ) => {
		console.log(res)
		throw new SubmissionError({ _error: `bad_credentials` })
	})
}

// REDUCERS
const initialState = { }
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case TEST_RECEIVE:
			return Object.assign({}, state, action.data)

		case TEST_REQUEST:
			return initialState

		default:
			return state
	}
}
