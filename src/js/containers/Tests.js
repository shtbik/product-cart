import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'
import FormInput from '../components/Form/InputRadio'
import TextArea from '../components/Form/TextArea'
import _ from 'lodash'
import { postTest } from '../modules/tests'
import {list_comp_classes, list_comps, list_comps_values} from '../configs/dataMarks'
// import Base from './Base'
import {validateTest as validate} from '../configs/form'

class Tests extends React.Component {

	 static propTypes = {
		params: PropTypes.object.isRequired,
		tests: PropTypes.object,
		handleSubmit: PropTypes.func,
		pristine: PropTypes.bool,
		submitting: PropTypes.bool,
		meta: PropTypes.object,
		error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
	}

	// componentWillMount() {
	// 	console.log(this.props.params.id)
	// }

	render() {
		const {handleSubmit, pristine, submitting, error, tests } = this.props
		// console.log('Ошибка: ', error)
		const thisTest = this.props.params.id
		const nameTest = _.find(list_comp_classes, {'id': Number(thisTest)})
		const filterComps = _.filter(list_comps, {'class_name': Number(thisTest)});
		// Выводим тест
		const testsHtml = _.map(filterComps, function(item, key) {
			const filterTest = _.filter(list_comps_values, {'comps_id': Number(item.id)});
			// console.log(list_comps_values, filterTest)
			const name = 'comps_id_' + item.id;
			let error = null
			let touch = null
			if (tests && tests.syncErrors) {
				_.forIn(tests.syncErrors, function(value, key) {
					if (key === name) {
						// console.log(tests.fields, name)
						if (tests.fields[key]) {
							touch = tests.fields[key].touched
						}
						error = value
					}
				})
			}
			const testsValues = _.map(filterTest, function(item, key) {
				return (
					<tr key={key}>
						<td>
							<label htmlFor={'id_' + item.id} dangerouslySetInnerHTML={{__html: item.name}}></label>
						</td>
						<td className="text-center">
							<FormInput
								id={'id_' + item.id}
								type="radio"
								name={name}
								value={item.order.toString()}
								validations={['required', 'non_empty']}
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
					<tr className="text-center">
						<td colSpan="2">
							<b>{item.name}</b>
						</td>
					</tr>
					{testsValues}
					{ error && touch ?
						<tr className="background-none">
							<td colSpan="2">
								<div className="alert alert-danger">
									<strong>Ошибка!</strong> {error}.
								</div>
							</td>
						</tr>
						: null }
				</tbody>
			)
		})

		return (
			<div className="container tests">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<h3 className="text-center">Тест "{nameTest.name}"</h3>
						{testsHtml.length ?
							<form onSubmit={handleSubmit(postTest)}>
								<table className="table table-striped table-responsive">
									<thead>
										<tr className="bg-primary">
											<th>Оценка по компетенциям</th>
											<th>Самооценка</th>
										</tr>
									</thead>
									{testsHtml}
								</table>
								<TextArea
									classList="form-control"
									rows="5"
									placeholder="Оставьте Ваш комментарий"
									name="comment"
									validations={['required', 'non_empty']}
								/>
								{error &&
									<div className="alert alert-danger">
										<strong>Ошибка!</strong> {error}.
									</div>
								}
								<div className="text-center">
									<button
										disabled={pristine || submitting}
										className="btn btn-lg btn-primary"
										type="submit">
										Отправить
									</button>
								</div>
							</form> :
							<p className="text-center">Данного теста нет на сервере</p>
						}
					</div>
				</div>
			</div>
		)
	}
}

const selector = createSelector(
	(state) => state.auth,
	(state) => state.form.tests,
	(auth, tests) => {
		return { auth, tests }
	}
)
const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps)(reduxForm({
	form: 'tests',
	validate,
	enableReinitialize: true
})(Tests))
