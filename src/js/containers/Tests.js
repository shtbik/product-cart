import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'
import FormInput from '../components/Form/Input'
import _ from 'lodash'
import {list_comp_classes, list_comps, list_comps_values} from '../configs/dataMarks'
// import Base from './Base'

class Tests extends React.Component {

	 static propTypes = {
		params: PropTypes.object.isRequired
	}

	// componentWillMount() {
	// 	console.log(this.props.params.id)
	// }

	render() {
		const thisTest = this.props.params.id
		const nameTest = _.find(list_comp_classes, {'id': Number(thisTest)})
		// console.log('Переменные: ', list_comps, list_comps_values)
		// Выводим тест
		const tests = _.map(list_comps, function(item, key) {
			const filterTest = _.filter(list_comps_values, {'comps_name': item.id});
			// console.log(filterTest, test)
			const testsValues = _.map(filterTest, function(item, key) {
				return (
					<tr key={key}>
						<td>
							{item.name}
						</td>
						<td className="text-center">
							<FormInput
								type="radio"
								name={'comps_id_' + item.comps_name}
								value={item.order.toString()}
							/>
						</td>
					</tr>
				)
			})
			return (
				<tbody key={key}>
					<tr>
						<td colSpan="2">
							&nbsp;
						</td>
					</tr>
					<tr>
						<td colSpan="2">
							<b>{item.name}</b>
						</td>
					</tr>
					{testsValues}
				</tbody>
			)
		})

		return (
			<div className="container tests">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<h3 className="text-center">Тест "{nameTest.name}"</h3>
						<form>
							<table className="table table-striped table-responsive">
								<thead>
									<tr className="bg-primary">
										<th>Оценка по компетенциям</th>
										<th>Самооценка</th>
									</tr>
								</thead>
								{tests}
							</table>
							<div className="form-group">
								<textarea
									className="form-control"
									rows="5"
									placeholder="Оставьте Ваш комментарий">
								</textarea>
							</div>
							<div className="text-center">
								<button
									className="btn btn-lg btn-primary"
									type="submit">
									Отправить
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const selector = createSelector(
	(state) => state.auth,
	(auth) => {
		return { auth }
	}
)
const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps)(reduxForm({
	form: 'tests',
	enableReinitialize: true
})(Tests))
