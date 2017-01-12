import _ from 'lodash'
import axios from 'axios'
import { SubmissionError } from 'redux-form'
import { browserHistory } from 'react-router'

import { axiosDefaults, core as coreConfig } from '../configs/core'

////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////////
export const AUTH_LOGIN_REQUEST = 'pp.admin/auth/AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_RECEIVE = 'pp.admin/auth/AUTH_LOGIN_RECEIVE'
export const AUTH_LOGOUT_REQUEST = 'pp.admin/auth/AUTH_LOGOUT_REQUEST'
export const AUTH_LOGOUT_RECEIVE = 'pp.admin/auth/AUTH_LOGOUT_RECEIVE'


////////////////////////////////////////////////////////////////////////////////////
// ACTIONS
////////////////////////////////////////////////////////////////////////////////////
const axiosInstance = axios.create(axiosDefaults)


//// -------SYNC------- //// 

export const receiveLogin = ( data ) => ({type: AUTH_LOGIN_RECEIVE, data, receivedAt: Date.now()})
export const requestLogin = ( params ) => ({type: AUTH_LOGIN_REQUEST, params})

export const receiveLogout = ( data ) => ({type: AUTH_LOGOUT_RECEIVE, data, receivedAt: Date.now()})
export const requestLogout = ( params ) => ({type: AUTH_LOGOUT_REQUEST, params})



//// -------ASYNC------- ////

/// _POST

export function login( req, dispatch ){
	return axiosInstance.post('/login', {data: req}).then(( res ) => {
		console.log(res)
		dispatch(receiveLogin(res.data))
		browserHistory.push('/')
	}).catch(( res ) => {
		console.log(res)
		throw new SubmissionError({ _error: `bad_credentials` })
	})
}

export function logout( req ){
	return ( dispatch ) => {
		dispatch(requestLogout())
		localStorage.removeItem(coreConfig.localStorage.name)
		browserHistory.push('/auth')
	}
}


////////////////////////////////////////////////////////////////////////////////////
// REDUCERS
////////////////////////////////////////////////////////////////////////////////////

const initialState = { }

export default function reducer(state = initialState, action) {

	switch (action.type) {
		case AUTH_LOGIN_RECEIVE:
			return Object.assign({}, state, action.data)

		case AUTH_LOGOUT_REQUEST: 
			return initialState

		default:
			return state
	}
	
}