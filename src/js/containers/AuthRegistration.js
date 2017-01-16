import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
// import _ from 'lodash'
// import { FormattedMessage } from 'react-intl'

import Loader from '../components/Loader'
import FormInput from '../components/Form/Input'
import FormSelect from '../components/Form/Select'
// import FormToggle from '../components/Form/Toggle'
// import { Row, Col } from '../components/Bootstrap'
// import { fetchConcurrent, post, postTest } from '../modules/content'
import { login } from '../modules/auth'
import { defaultValidate as validate } from '../configs/form'
import { Link } from 'react-router';

class AuthLogin extends React.Component {

	static propTypes = {
		error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
		handleSubmit: PropTypes.func,
		submitting: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
	}

	render() {
		const {handleSubmit, submitting} = this.props
		return (
			<div className="registration">
				<Loader show={submitting}>
					<div className="container">
						<div className="row">
							<div className="col-sm-8 col-md-8">
								<h1 className="text-center login-title">Регистрация</h1>
								<div className="account-wall">
									<img className="profile-img" src="/img/logo.png" />
									<form className="form-signin" role="form" onSubmit={handleSubmit(login)}>
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
													type="text"
													name="position"
													className="form-control"
												>
													<option>-----</option>
												</FormSelect>
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
													type="text"
													name="department_id"
													className="form-control"
												>
													<option>-----</option>
													<option value="1">Правление</option>
													<option value="2">Дирекция Перспективных проектов</option>
													<option value="3">Дирекция Разработки и Эксплуатации ИТ</option>
													<option value="4">Отдел эксплуатации ПО</option>
													<option value="5">Отдел разработки и внедрения ПО</option>
													<option value="6">Направление разработки серверных технологий</option>
													<option value="7">Направление разработки приложений и интерфейсов</option>
													<option value="8">Дирекция по Маркетингу и Коммуникациям</option>
													<option value="9">Бек офис</option>
													<option value="10">Финансовая служба</option>
													<option value="11">Юридическая служба</option>
													<option value="12">Административная группа</option>
													<option value="13">Дирекция HR</option>
													<option value="14">Служба Безопасности</option>

													<option value="15">Правление уровень 2</option>
													<option value="16">Дирекция Образовательных программ</option>
													<option value="17">Дирекция Партнерских программ</option>
													<option value="18">Дирекция Продуктов и Сервисов</option>
												</FormSelect>
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

export default reduxForm({form: 'login', validate})(AuthLogin)
