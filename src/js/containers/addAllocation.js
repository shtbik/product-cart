import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'
// import { Link } from 'react-router'
// import _ from 'lodash'
// import {list_comp_classes} from '../configs/dataMarks'
import FormInput from '../components/Form/Input'
import FormSelect from '../components/Form/Select'
import { addAllocation as postAllocation } from '../modules/allocation'

class addAllocation extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func,
		tests: PropTypes.object,
		auth: PropTypes.object.isRequired,
		pristine: PropTypes.bool,
		submitting: PropTypes.bool,
		initialValues: PropTypes.object,
		handleSubmit: PropTypes.func
	}

	render() {
		const {handleSubmit, pristine, submitting } = this.props
		const year = moment().format('YYYY')

		return (
			<div className="container mark">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<form className="form-addAllocation" role="form" onSubmit={handleSubmit(postAllocation)}>
							<div className="row addAllocation">
								<div className="col-md-12 col-sm-12 col-xs-12">
									<h3 className="text-center">Добавить цель на {year} год</h3><br />
									<div className="row">
										<div className="col-md-6 col-sm-12 col-xs-12">
											<label className="checkbox pull-left">
												Цель руководителя / наименование КПЭ:
											</label>
											<FormInput
												type="text"
												name="first_name"
												className="form-control"
											/>
											<label className="checkbox pull-left">
												Тип цели:
											</label>
											<FormSelect
												name="middle_name"
												className="form-control"
											>
												<option value="Типовая">Типовая</option>
												<option value="Индивидуальная">Индивидуальная</option>
											</FormSelect>
											<label className="checkbox pull-left">
												Вид цели:
											</label>
											<FormSelect
												name="position"
												className="form-control"
											>
												<option value="КПЭ">КПЭ</option>
												<option value="ППР">ППР</option>
											</FormSelect>
											<label className="checkbox pull-left">
												Единица измерения для КПЭ:
											</label>
											<FormInput
												type="text"
												name="ed"
												className="form-control"
												placeholder="Например, процент достижения"
											/>
										</div>
										<div className="col-md-6 col-sm-12 col-xs-12">
											<label className="checkbox pull-left">
												Вес в % за <b>1 квартал</b>:
											</label>
											<FormInput
												type="text"
												name="last_name"
												className="form-control"
											/>
											<label className="checkbox pull-left">
												Вес в % за <b>2 квартал</b>:
											</label>
											<FormInput
												type="text"
												name="email"
												className="form-control"
											/>
											<label className="checkbox pull-left">
												Вес в % за <b>3 квартал</b>:
											</label>
											<FormInput
												type="text"
												name="department_id"
												className="form-control"
											/>
											<label className="checkbox pull-left">
												Вес в % за <b>4 квартал</b>:
											</label>
											<FormInput
												type="text"
												name="password_repeat"
												className="form-control"
											/>
										</div>
									</div>
									<button
										disabled={pristine || submitting}
										className="btn btn-lg btn-primary btn-block"
										type="submit">
										Добавить цель
									</button>
									<span className="clearfix"></span>
								</div>
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
	form: 'addAllocation',
	// validate
})(addAllocation))
