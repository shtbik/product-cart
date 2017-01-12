import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl'

import Loader from '../components/Loader'
import FormInput from '../components/Form/Input'
import FormToggle from '../components/Form/Toggle'
import { Row, Col } from '../components/Bootstrap'
import { fetchConcurrent, post, postTest } from '../modules/content'
import { login } from '../modules/auth'
import { defaultValidate as validate } from '../configs/form'


class AuthLogin extends React.Component {

	render(){

		const { error, handleSubmit, pristine, reset, submitting } = this.props

		return (
			<div>
				<div className="auth-header description">Новое партнерское приложение</div>
				<div className="auth-header name">ИС «Единое окно»</div>
				<Loader show={submitting}>
					<form className="m-t" role="form" onSubmit={handleSubmit(login)}>
						{error && <div className="alert alert-danger"><FormattedMessage id={`errors.${error}`}/></div>}
						<FormInput name="username" />
						<FormInput name="password" type="password" />
						<button type="submit" className="btn btn-primary block full-width m-b">
							<FormattedMessage id="nav.login" />
						</button>
					</form>
				</Loader>	
				
			</div>
		)
	}
}

export default reduxForm({form: 'login', validate})(AuthLogin)