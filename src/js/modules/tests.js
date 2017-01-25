import axios from 'axios'
import _ from 'lodash'
import { SubmissionError } from 'redux-form'
import { browserHistory } from 'react-router'

import { axiosDefaults } from '../configs/core'
import {list_comp_classes, list_comps, list_comps_values} from '../configs/dataMarks'

// CONSTANTS
export const TEST_REQUEST = 'doalloc/tests/TEST_REQUEST'
export const TEST_RECEIVE = 'doalloc/tests/TEST_RECEIVE'

export const TEST_LIST_REQUEST = 'doalloc/tests/TEST_LIST_REQUEST'
export const TEST_LIST_RECEIVE = 'doalloc/tests/TEST_LIST_RECEIVE'

export const TEST_POST_REQUEST = 'doalloc/tests/TEST_POST_REQUEST'
export const TEST_POST_RECEIVE = 'doalloc/tests/TEST_POST_RECEIVE'

// ACTIONS
const axiosInstance = axios.create(axiosDefaults)

// -------SYNC-------
export const receiveTest = ( data ) => ({type: TEST_RECEIVE, data, receivedAt: Date.now()})
export const requestTest = ( params ) => ({type: TEST_REQUEST, params})

export const receiveTestList = ( data ) => ({type: TEST_LIST_RECEIVE, data, receivedAt: Date.now()})
export const requestTestList = ( params ) => ({type: TEST_LIST_REQUEST, params})

export const receivePostTest = ( data ) => ({type: TEST_POST_RECEIVE, data, receivedAt: Date.now()})
export const requestPostTest = ( params ) => ({type: TEST_POST_REQUEST, params})

// -------ASYNC-------
// _POST
export function postTest( req, dispatch ) {
	console.log('Отправка данных на сервер: ', req)
	return axiosInstance.post('/post', {data: req}).then(( res ) => {
		console.log(res)
		dispatch(receivePostTest(res.data))
		browserHistory.push('/mark')
	}).catch(( res ) => {
		console.log(res)
		throw new SubmissionError({ _error: `bad_credentials` })
	})
}

export function getTest( req ) {
	return (dispatch) => {
		// return axiosInstance.get('/test/' + req).then(( res ) => {
		return axiosInstance.post('/post', {test_id: req}).then(() => {
			// console.log(res)
			const nameTest = _.find(list_comp_classes, {'id': Number(req)})
			const filterComps = _.filter(list_comps, {'class_name': Number(req)});
			const data = {
				name: nameTest.name,
				comps: filterComps,
				arrayTests: []
			}
			_.map(filterComps, function(item) {
				const filterTest = _.filter(list_comps_values, {'comps_id': Number(item.id)});
				_.map(filterTest, function(item) {
					data.arrayTests.push(item)
				})
			})
			console.log(data)

			dispatch(receiveTest(data))
		}).catch(( res ) => {
			console.log(res)
			throw new SubmissionError({ _error: `bad_credentials` })
		})
	}
}

export function getTestList(userId) {
	return (dispatch) => {
		// axiosInstance.post('/get' + req).then(( res ) => {
		axiosInstance.post('/get', userId).then(( res ) => {
			console.log(res)
			dispatch(receiveTestList(list_comp_classes))
		}).catch(( res ) => {
			console.log(res)
			throw new SubmissionError({ _error: `bad_credentials` })
		})
	}
}

// REDUCERS
const initialState = { }
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case TEST_RECEIVE:
			return Object.assign({}, state, {test: action.data})

		case TEST_LIST_RECEIVE:
			return Object.assign({}, state, {list_comp_classes: action.data, test: null})

		case TEST_POST_RECEIVE:
			return Object.assign({}, state, {test: action.data})

		case TEST_REQUEST:
		case TEST_POST_REQUEST:
		case TEST_LIST_REQUEST:
			return initialState

		default:
			return state
	}
}
