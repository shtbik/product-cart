import React from 'react'
import { Field } from 'redux-form'
import _ from 'lodash'
import { FormGroup, FormControl } from 'react-bootstrap'

const input = (data) => {
	const { input, meta } = data
	const rows = data.rows || 5
	const validations = _.get(data, 'validations', [])
	const isReqired = !!_.find(validations, (v) => {
		return ['required', 'non_empty'].indexOf(v) !== -1
	})
	// console.log(validations, isReqired)
	const placeholder = data.placeholder
	const {error, touched} = meta
	const validationState = error ? 'error' : null
	const floatlInputClass = data.classList
	let errorBlock = null
	if (error && touched) {
		errorBlock = (
			<div className="alert alert-danger">
				<strong>Ошибка!</strong> {error}.
			</div>
		)
	} else if (isReqired && touched && !data.input.value) {
		errorBlock = (
			<div className="alert alert-danger">
				<strong>Ошибка!</strong> Поле обязательно к заполнению.
			</div>
		)
	}

	return (
		<FormGroup controlId={input.name} validationState={validationState}>
			<FormControl {...input} className={floatlInputClass} componentClass="textarea" rows={rows} placeholder={placeholder} />
				{errorBlock}
		</FormGroup>
	)
}

export default function FormTextArea(data) {
	return <Field {...data} component={input} />
}
