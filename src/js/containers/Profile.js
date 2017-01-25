import React, { PropTypes } from 'react'
// import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
// import cn from 'classnames'
// import _ from 'lodash'
import { createSelector } from 'reselect'
import FormInput from '../components/Form/Input'
// import FormSelect from '../components/Form/Select'
// import { login } from '../modules/auth'
import { reduxForm } from 'redux-form'
// import { defaultValidate as validate } from '../configs/form'
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
// import { FormattedMessage, FormattedDate } from 'react-intl'

import Loader from '../components/Loader'
// import PageBase from './PageBase'
// import PageHeader from './PageHeader'
// import UserForm from './UserForm'
import { changeProfile } from '../modules/auth'
// import BootstrapTablePreset from '../components/BootstrapTablePreset'

class Profile extends React.Component {

	static propTypes = {
		// handleSubmit: propTypes.func,
		auth: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func,
		pristine: PropTypes.bool,
		submitting: PropTypes.bool
	}

	render() {
		const {handleSubmit, pristine, submitting } = this.props

		return (
			<Loader show={false}>
				<form className="form-signin" role="form" onSubmit={handleSubmit(changeProfile)}>
					<div className="row profile">
						<div className="col-md-4 col-sm-3 col-xs-12">
							<div className="text-center">
								<img src="/img/default-avatar.jpg" className="avatar img-thumbnail" alt="avatar"/>
								<h6>Загрузите фото...</h6>
								<FormInput
										type="file"
										name="logo"
										className="text-center center-block well well-sm"
									/>
							</div>
						</div>
						<div className="col-md-8 col-sm-9 col-xs-12 personal-info">
							{ /* <div className="alert alert-info alert-dismissable">
								<a className="panel-close close" data-dismiss="alert">×</a>
								<i className="fa fa-coffee"></i>
								This is an <strong>.alert</strong>. Use this to show important messages to the user.
							</div> */ }
							<h3>Ваши данные</h3>
							<div className="row">
								<div className="col-md-6 col-sm-12 col-xs-12">
									<label className="checkbox pull-left">
										Имя:
									</label>
									<FormInput
										type="text"
										name="first_name"
										className="form-control"
										disabled
									/>
									<label className="checkbox pull-left">
										Отчество:
									</label>
									<FormInput
										type="text"
										name="middle_name"
										className="form-control"
										disabled
									/>
									<label className="checkbox pull-left">
										Должность:
									</label>
									<FormInput
										type="text"
										name="position"
										className="form-control"
										disabled
									/>
									<label className="checkbox pull-left">
										Пароль:
									</label>
									<FormInput
										type="password"
										name="password"
										className="form-control"
									/>
								</div>
								<div className="col-md-6 col-sm-12 col-xs-12">
									<label className="checkbox pull-left">
										Фамилия:
									</label>
									<FormInput
										type="text"
										name="last_name"
										className="form-control"
										disabled
									/>
									<label className="checkbox pull-left">
										E-mail:
									</label>
									<FormInput
										type="text"
										name="email"
										className="form-control"
									/>
									<label className="checkbox pull-left">
										Отдел:
									</label>
									<FormInput
										type="text"
										name="department_id"
										className="form-control"
										disabled
									/>
									<label className="checkbox pull-left">
										Повторите пароль:
									</label>
									<FormInput
										type="password"
										name="password_repeat"
										className="form-control"
									/>
								</div>
							</div>
							<button
								disabled={pristine || submitting}
								className="btn btn-lg btn-primary btn-block"
								type="submit">
								Изменить информацию
							</button>
							<span className="clearfix"></span>
						</div>
					</div>
				</form>
			</Loader>
		)
	}
}

const selector = createSelector(
	(state) => state.auth,
	(auth) => {
		// Временная мера, пароль с сервера приходить не должен
		auth.password = ''
		return {
			auth,
			initialValues: auth}
	}
)

const mapStateToProps = ( state ) => ({ ...selector(state) })

export default connect(mapStateToProps)(reduxForm({
	form: 'profile',
	// validate,
	enableReinitialize: true
})(Profile))
