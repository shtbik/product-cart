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
import { validateLogin as validate } from '../configs/form'
import { Link } from 'react-router'

class AuthLogin extends React.Component {

	static propTypes = {
		error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		handleSubmit: PropTypes.func,
		submitting: PropTypes.bool,
		pristine: PropTypes.bool,
	}

	render() {
		const {handleSubmit, submitting, pristine, error} = this.props
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
											name="email"
											className="form-control"
											placeholder="E-mail"
										/>
										<FormInput
											type="password"
											name="password"
											className="form-control"
											placeholder="Пароль"
										/>
										{error &&
											<div className="alert alert-danger">
												<strong>Ошибка!</strong> {error}.
											</div>
										}
										<button
											disabled={pristine || submitting}
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
			</div>
		)
	}
}

export default reduxForm({
	form: 'login',
	validate
})(AuthLogin)
