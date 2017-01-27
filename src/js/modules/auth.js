import axios from 'axios'
import _ from 'lodash'
import { SubmissionError } from 'redux-form'
import { browserHistory } from 'react-router'

import { axiosDefaults, core as coreConfig } from '../configs/core'
import { data_users, list_positions, list_departments } from '../configs/usersData'

// CONSTANTS
export const AUTH_LOGIN_REQUEST = 'doalloc/auth/AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_RECEIVE = 'doalloc/auth/AUTH_LOGIN_RECEIVE'
export const AUTH_LOGOUT_REQUEST = 'doalloc/auth/AUTH_LOGOUT_REQUEST'
export const AUTH_LOGOUT_RECEIVE = 'doalloc/auth/AUTH_LOGOUT_RECEIVE'
export const AUTH_REGISTRATION_REQUEST = 'doalloc/auth/AUTH_REGISTRATION_REQUEST'
export const AUTH_REGISTRATION_RECEIVE = 'doalloc/auth/AUTH_REGISTRATION_RECEIVE'
export const AUTH_CHANGEPROFILE_REQUEST = 'doalloc/auth/AUTH_CHANGEPROFILE_REQUEST'
export const AUTH_CHANGEPROFILE_RECEIVE = 'doalloc/auth/AUTH_CHANGEPROFILE_RECEIVE'

// ACTIONS
// На время регистрации
// axiosDefaults.baseURL = 'http://localhost:3000/'
const axiosInstance = axios.create(axiosDefaults)

// -------SYNC-------
export const receiveLogin = ( data ) => ({type: AUTH_LOGIN_RECEIVE, data, receivedAt: Date.now()})
export const requestLogin = ( params ) => ({type: AUTH_LOGIN_REQUEST, params})

export const receiveLogout = ( data ) => ({type: AUTH_LOGOUT_RECEIVE, data, receivedAt: Date.now()})
export const requestLogout = ( params ) => ({type: AUTH_LOGOUT_REQUEST, params})

export const receiveRegistration = ( data ) => ({type: AUTH_REGISTRATION_RECEIVE, data, receivedAt: Date.now()})
export const requestRegistration = ( params ) => ({type: AUTH_REGISTRATION_REQUEST, params})

export const receiveChangeProfile = ( data ) => ({type: AUTH_CHANGEPROFILE_RECEIVE, data, receivedAt: Date.now()})
export const requestChangeProfile = ( params ) => ({type: AUTH_CHANGEPROFILE_REQUEST, params})


// -------ASYNC-------
// _POST
export function login( req, dispatch ) {
	console.log('Ищем юзера: ', req)
	const sendUser = req
	return axiosInstance.post('/post', {data: req}).then(( res ) => {
		console.log(res)
		// dispatch(receiveLogin(res.data))
		// browserHistory.push('/')
		// Операция на время отсутсвия бекенда. Ищем юзера из файла и отдаем в redux
		// // -------------------------------
		const thisUser = _.find(data_users, {email: sendUser.email, password: sendUser.password})
		if (thisUser && thisUser.email) {
			const thisPosition = _.find(list_positions, {id: Number(thisUser.position)})
			const thisDepartament = _.find(list_departments, {id: Number(thisUser.department_id)})
			// console.log(thisPosition, thisDepartament)
			thisUser.position = thisPosition.name
			thisUser.department_id = thisDepartament.name
			thisUser.api_token = '702fcfec738f4cfa8f6b48c2a56b9534'
			// console.log(thisUser)
			dispatch(receiveLogin(thisUser))
			browserHistory.push('/')
		} else {
			throw new SubmissionError({ _error: `Пользователь не найден` })
		}
		// -------------------------------
	}).catch(( res ) => {
		console.log(res)
		throw new SubmissionError({ _error: `bad_credentials` })
	})
}

export function logout() {
	return ( dispatch ) => {
		dispatch(requestLogout())
		localStorage.removeItem(coreConfig.localStorage.name)
		browserHistory.push('/auth')
	}
}

const chars = 'abcdefghkmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';
function generatePassword(length) {
	return _.sampleSize(chars, length).join('')
}

export function reg( req, data, dispatch ) {
	data.grades_id = null;
	data.photo_url = null
	data.department_id = Number(data.department_id)
	data.position = Number(data.position)
	data.password = generatePassword(8);
	// console.log('Данные для отправки на сервер: ', data)
	return axiosInstance.post('/reg', data).then(( res ) => {
		// console.log(res)
		if (req.callback) req.callback(res)
		dispatch(receiveRegistration(null))
	}).catch(( res ) => {
		console.log(res)
		throw new SubmissionError({ _error: `bad_credentials` })
	})
}


export function changeProfile(req) {
	console.log('Отравка данных на сервер:', req)
	return (dispatch) => {
		return axiosInstance.post('/post', {data: req}).then(( res ) => {
			console.log(res)
			dispatch(receiveChangeProfile(res.data))
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
		case AUTH_LOGIN_RECEIVE:
			return Object.assign({}, state, action.data)

		case AUTH_REGISTRATION_RECEIVE:
			return Object.assign({}, state, null)

		case AUTH_CHANGEPROFILE_RECEIVE:
			return Object.assign({}, state, action.data)

		case AUTH_LOGOUT_REQUEST:
			return initialState

		default:
			return state
	}
}
