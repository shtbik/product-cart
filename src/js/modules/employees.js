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
			// const userDepartaments = Object.assign({}, _.filter(list_departments, {manager_id: Number(userId)}))
			const userDepartaments = _.filter(list_departments, {manager_id: Number(userId)})
			// console.log('Департаменты юзера: ', userDepartaments)
			if (userDepartaments && userDepartaments.length > 0) {
				let subordinates = [];
				_.map(userDepartaments, function(item) {
					const idDepartaments = item.id
					if (item.parent_department_id !== null) {
						Object.assign({}, _.filter(data_users, function(item) {
							const {department_id, id} = item
							// В этом случае мы выводим людей которые управляют несколькими отделами, но обычно именно они стоят выше, поэтому пропускаем
							// if (department_id === idDepartaments || (department_id && department_id.toString().indexOf(idDepartaments.toString()) !== -1)) {
							if (department_id === idDepartaments && id !== userId) {
								const clone = Object.assign({}, item)
								subordinates.push(clone)
								return true
							}
						}))
					} else {
						_.forEach(list_departments, function(item) {
							const {manager_id} = item
							if (manager_id !== userId) {
								const clone = Object.assign({}, _.find(data_users, {id: manager_id}))
								subordinates.push(clone)
							}
						})
					}
				})
				subordinates = _.uniq(subordinates)
				// console.log('Подчиненные: ', JSON.parse(JSON.stringify(subordinates)))
				// console.log('Подчиненные: ', subordinates)
				// Меняем значение id на реальные названия
				if (subordinates && subordinates.length > 0) {
					_.forEach(subordinates, function(item) {
						const thisPosition = Object.assign({}, _.find(list_positions, {id: Number(item.position)}))
						item.position = thisPosition.name
						let thisDepartment = null
						if (typeof item.department_id === 'string') {
							const arrDepartment = item.department_id.split(',')
							thisDepartment = []
							_.forEach(arrDepartment, function(item) {
								const department = _.find(list_departments, {id: Number(item)})
								if (department) {
									thisDepartment.push(department.name)
								}
							})
							item.department_id = thisDepartment.join(', ')
						} else {
							thisDepartment = _.find(list_departments, {id: Number(item.department_id)})
							item.department_id = thisDepartment.name
						}
					})
				}
				// console.log('Подчиненные c текстовыми данными: ', subordinates)
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
