import axios from 'axios'
// import _ from 'lodash'
import { SubmissionError } from 'redux-form'
import { axiosDefaults } from '../configs/core'
import {data_users} from '../configs/usersData'

// CONSTANTS
export const EMPLOYEES_REQUEST = 'doalloc/employees/EMPLOYEES_REQUEST'
export const EMPLOYEES_RECEIVE = 'doalloc/employees/EMPLOYEES_RECEIVE'

// ACTIONS
const axiosInstance = axios.create(axiosDefaults)

// -------SYNC-------
export const receiveEmployees = ( data ) => ({type: EMPLOYEES_RECEIVE, data, receivedAt: Date.now()})
export const requestEmployees = ( params ) => ({type: EMPLOYEES_REQUEST, params})

// -------ASYNC-------
// _POST
export function getEmployees( req ) {
	console.log('Отправка данных на сервер: ', req)
	return (dispatch) => {
		return axiosInstance.post('/post', {data: req}).then(( res ) => {
			console.log(res)
			dispatch(receiveEmployees(data_users))
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
		case EMPLOYEES_RECEIVE:
			return Object.assign({}, state, action.data)

		case EMPLOYEES_REQUEST:
			return initialState

		default:
			return state
	}
}
