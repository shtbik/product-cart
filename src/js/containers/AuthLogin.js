import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
// import _ from 'lodash'
// import { FormattedMessage } from 'react-intl'

import Loader from '../components/Loader'
import FormInput from '../components/Form/Input'
// import FormToggle from '../components/Form/Toggle'
// import { Row, Col } from '../components/Bootstrap'
// import { fetchConcurrent, post, postTest } from '../modules/content'
import { login } from '../modules/auth'
import { defaultValidate as validate } from '../configs/form'
import { Link } from 'react-router'

class AuthLogin extends React.Component {

	static propTypes = {
		error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
		handleSubmit: PropTypes.func,
		submitting: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
	}

	render() {
		const {handleSubmit, submitting} = this.props
		return (
			<div className="login">
				<Loader show={submitting}>
					<div className="container">
						<div className="row">
							<div className="col-sm-6 col-md-4 col-md-offset-4">
								<h1 className="text-center login-title">Вход</h1>
								<div className="account-wall">
									<img className="profile-img" src="/img/logo.png" />
									<form className="form-signin" role="form" onSubmit={handleSubmit(login)}>
										<FormInput
											type="text"
											name="username"
											className="form-control"
											placeholder="E-mail"
										/>
										<FormInput
											type="password"
											name="password"
											className="form-control"
											placeholder="Пароль"
										/>
										<button
											className="btn btn-lg btn-primary btn-block"
											type="submit">
											Войти
										</button>
										<label className="checkbox pull-left">
											<input type="checkbox" value="remember-me" />
											Запомнить меня
										</label>
										<a href="#" className="pull-right need-help">Нужна помощь?</a>
										<span className="clearfix"></span>
									</form>
								</div>
								<Link to="/auth/reg" activeClassName="on" className="text-center new-account">Создать аккаунт</Link>
							</div>
						</div>
					</div>
				</Loader>
				{ /* <div>
					<div className="auth-header description">Новое партнерское приложение</div>
					<div className="auth-header name">ИС «Единое окно»</div>
					<Loader show={submitting}>
						<form className="m-t" role="form" onSubmit={handleSubmit(login)}>
							{error && <div className="alert alert-danger">ошибка</div>}
							<FormInput name="username" />
							<FormInput name="password" type="password" />
							<button type="submit" className="btn btn-primary block full-width m-b">
								отправить
							</button>
						</form>
					</Loader>
				</div> */ }
			</div>
		)
	}
}

export default reduxForm({form: 'login', syncValidation: validate})(AuthLogin)
