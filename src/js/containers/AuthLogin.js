import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
// import _ from 'lodash'
// import { FormattedMessage } from 'react-intl'

// import Loader from '../components/Loader'
import FormInput from '../components/Form/Input'
// import FormToggle from '../components/Form/Toggle'
// import { Row, Col } from '../components/Bootstrap'
// import { fetchConcurrent, post, postTest } from '../modules/content'
import { login } from '../modules/auth'
import { defaultValidate as validate } from '../configs/form'


class AuthLogin extends React.Component {

	static propTypes = {
		error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
		handleSubmit: PropTypes.func,
		submitting: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
	}

	render() {
		const {handleSubmit} = this.props
		return (
			<div className="login">
				<div>
					<a className="hiddenanchor" id="signup"></a>
					<a className="hiddenanchor" id="signin"></a>

					<div className="login_wrapper">
						<div className="animate form login_form">
							<section className="login_content">
								<form onSubmit={handleSubmit(login)}>
									<h1>Вход</h1>
									<div>
										<FormInput name="username" className="form-control" placeholder="Username" required="" />
									</div>
									<div>
										<input type="password" className="form-control" placeholder="Password" required="" />
									</div>
									<div>
										<a className="btn btn-default submit" href="index.html">Войти</a>
										<a className="reset_pass" href="#">Забыли свой пароль?</a>
									</div>

									<div className="clearfix"></div>

									<div className="separator">
										<p className="change_link">Впервые на сайте?
											<a href="#signup" className="to_register"> Создать аккаунт </a>
										</p>

										<div className="clearfix"></div>
										<br />

										<div>
											<p>©2017 АО "Деловая Среда"</p>
										</div>
									</div>
								</form>
							</section>
						</div>

						{ /* <div id="register" className="animate form registration_form">
							<section className="login_content">
								<form>
									<h1>Create Account</h1>
										<div>
											<input type="text" className="form-control" placeholder="Username" required="" />
										</div>
									<div>
										<input type="email" className="form-control" placeholder="Email" required="" />
									</div>
									<div>
										<input type="password" className="form-control" placeholder="Password" required="" />
									</div>
									<div>
										<a className="btn btn-default submit" href="index.html">Submit</a>
									</div>

									<div className="clearfix"></div>

									<div className="separator">
										<p className="change_link">Already a member ?
											<a href="#signin" className="to_register"> Log in </a>
										</p>

										<div className="clearfix"></div>
										<br />

										<div>
											<h1><i className="fa fa-paw"></i> Gentelella Alela!</h1>
											<p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
										</div>
									</div>
								</form>
							</section>
						</div> */ }
					</div>
				</div>
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

export default reduxForm({form: 'login', validate})(AuthLogin)
