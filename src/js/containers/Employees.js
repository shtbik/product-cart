import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'
// import {list_comp_classes} from '../configs/dataMarks'
import { getEmployees } from '../modules/employees'

class Employees extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func,
		employees: PropTypes.object,
		auth: PropTypes.object.isRequired,
	}

	componentDidMount() {
		const {id} = this.props.auth
		// Используется для идентификации пользователя. За какой период отдавать тесты вычисляем на сервере
		const data = {
			user_id: id
		}
		this.props.dispatch(getEmployees(data))
	}

	render() {
		const {employees} = this.props
		// console.log('Переменные: ', list_comp_classes)
		let employeesTable = null
		// Выводим все тесты юзера (пройденные или нет за этот квартал)
		if (employees) {
			employeesTable = (
				_.map(employees, function(item, key) {
					const {last_name, first_name, middle_name, email, position, department_id} = item
					return (
						<tr>
							<th>{key}</th>
							<td>{last_name + ' ' + first_name + ' ' + middle_name}</td>
							<td>{email}</td>
							<td>{position}</td>
							<td>{department_id}</td>
						</tr>
					)
				})
			)
		}

		return (
			<div className="container mark">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<h3 className="text-center">Сотрудники в подчинении</h3>
						{employeesTable ?
							<table className="table table-striped">
								<thead>
									<tr>
										<th>#</th>
										<th>ФИО</th>
										<th>E-mail</th>
										<th>Должность</th>
										<th>Отдел</th>
									</tr>
								</thead>
								<tbody>
									{employeesTable}
								</tbody>
							</table>
							:
							<p className="text-center">На данный момент у Вас нет сотрудников в подчинении</p>
						}
					</div>
				</div>
			</div>
		)
	}
}

const selector = createSelector(
	(state) => state.auth,
	(state) => state.employees,
	(auth, employees) => {
		return { auth, employees }
	}
)
const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps)(Employees)
