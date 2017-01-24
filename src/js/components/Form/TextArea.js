import React from 'react'
import { Field } from 'redux-form'
// import _ from 'lodash'
import { FormGroup, FormControl } from 'react-bootstrap'

const input = (data) => {
	const { input, meta, defaultValue, disabled } = data
	const { value: inputValue } = input
	const value = inputValue || defaultValue
	const rows = data.rows || 5
	// const validations = _.get(data, 'validations', [])
	// const isReqired = !!_.find(validations, (v) => {
	// 	return ['required', 'non_empty'].indexOf(v) !== -1
	// })
	// console.log(validations, isReqired)
	const placeholder = data.placeholder
	const {error, touched} = meta
	let validationState = null
	let errorText = null
	if (error && touched) {
		validationState = 'error'
		errorText = error
	}

	return (
		<FormGroup controlId={input.name} validationState={validationState}>
			<FormControl {...input} componentClass="textarea" disabled={disabled} rows={rows} placeholder={errorText ? errorText : placeholder} />
				{errorText && value &&
					<div className="alert alert-danger">
			 			<strong>Ошибка!</strong> {errorText}
					</div>
				}
		</FormGroup>
	)
}

export default function FormTextArea(data) {
	return <Field {...data} component={input} />
}
