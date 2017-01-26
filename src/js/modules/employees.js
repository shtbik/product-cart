import axios from 'axios'
import _ from 'lodash'
import { SubmissionError } from 'redux-form'
import { axiosDefaults } from '../configs/core'
import {data_users, list_departments, list_positions} from '../configs/usersData'

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
export function getEmployees(userId) {
	console.log('Отправка данных на сервер: ', userId)
	return (dispatch) => {
		return axiosInstance.post('/post', {user_id: userId}).then(( res ) => {
			console.log(res)
			const userDepartaments = _.filter(list_departments, {manager_id: Number(userId)})
			console.log(userDepartaments)
			if (userDepartaments && userDepartaments.length > 0) {
				let subordinates = [];
				_.map(userDepartaments, function(item) {
					const idDepartaments = item.id
					_.filter(data_users, function(item) {
						const thisDepartment_id = item.department_id
						if (thisDepartment_id === idDepartaments || (thisDepartment_id && thisDepartment_id.toString().indexOf(idDepartaments.toString()) !== -1)) {
							subordinates.push(item)
							return true
						}
					})
				})
				subordinates = _.uniq(subordinates)
				// Меняем значение id на реальные названия
				if (subordinates && subordinates.length > 0) {
					_.forEach(subordinates, function(item) {
						const thisPosition = _.find(list_positions, {id: Number(item.position)})
						const thisDepartment = _.find(list_departments, {id: Number(item.department_id)})
						item.position = thisPosition.name
						if (thisDepartment) {
							item.department_id = thisDepartment.name
						}
					})
				}
				console.log(subordinates)
				// console.log(userDepartaments, subordinates)
				dispatch(receiveEmployees(subordinates))
			} else {
				dispatch(receiveEmployees(null))
			}
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
			return Object.assign({}, state, {subordinates: action.data})

		case EMPLOYEES_REQUEST:
			return initialState

		default:
			return state
	}
}
