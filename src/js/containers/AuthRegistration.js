import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import _ from 'lodash'
import { Link } from 'react-router';
// import Loader from '../components/Loader'
import FormInput from '../components/Form/Input'
import FormSelect from '../components/Form/Select'
// import FormToggle from '../components/Form/Toggle'
// import { Row, Col } from '../components/Bootstrap'
// import { fetchConcurrent, post, postTest } from '../modules/content'
import { reg } from '../modules/auth'
import { list_positions, list_departments } from '../configs/usersData'
import { validateReg as validate } from '../configs/form'


class AuthRegistration extends React.Component {

	static propTypes = {
		error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		handleSubmit: PropTypes.func,
		submitting: PropTypes.bool,
		pristine: PropTypes.bool,
		reset: PropTypes.func,
		dispatch: PropTypes.func,
	}

	onSuccess() {
		// console.log('Success', res, this.props)
		this.props.dispatch(this.props.reset())
	}

	render() {
		const {handleSubmit, submitting, pristine, error} = this.props
		const departments = _.map(list_departments, function(item, key) {
			return <option key={key} value={item.id}>{item.name}</option>
		})
		const position = _.map(list_positions, function(item, key) {
			return <option key={key} value={item.id}>{item.name}</option>
		})
		return (
			<div className="registration">
				<div className="container">
					<div className="row">
						<div className="col-sm-8 col-md-8">
							<h1 className="text-center login-title">Регистрация</h1>
							<div className="account-wall">
								<img className="profile-img" src="/img/logo.png" />
								<form className="form-signin" role="form" onSubmit={handleSubmit(reg.bind(this, {callback: ::this.onSuccess}))}>
									<div className="row">
										<div className="col-sm-6 col-md-6">
											<label className="checkbox pull-left">
												Имя:
											</label>
											<FormInput
												type="text"
												name="first_name"
												className="form-control"
											/>
											<label className="checkbox pull-left">
												Отчество:
											</label>
											<FormInput
												type="text"
												name="middle_name"
												className="form-control"
											/>
											<label className="checkbox pull-left">
												Должность:
											</label>
											<FormSelect
												name="position"
												className="form-control"
												option={position}
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
										<div className="col-sm-6 col-md-6">
											<label className="checkbox pull-left">
												Фамилия:
											</label>
											<FormInput
												type="text"
												name="last_name"
												className="form-control"
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
											<FormSelect
												name="department_id"
												className="form-control"
												option={departments}
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
									{error &&
										<div className="alert alert-danger">
											<strong>Ошибка!</strong> {error}.
										</div>
									}
									<button
										disabled={pristine || submitting}
										className="btn btn-lg btn-primary btn-block"
										type="submit">
										Создать аккаунт
									</button>
									<a href="#" className="pull-right need-help">Нужна помощь?</a>
									<span className="clearfix"></span>
								</form>
							</div>
							<Link to="/auth/login" activeClassName="on" className="text-center new-account">У меня есть аккаунт</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'registration',
	validate
})(AuthRegistration)
