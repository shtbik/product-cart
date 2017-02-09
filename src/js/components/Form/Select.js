import React from 'react'
import { Field } from 'redux-form'
// import _ from 'lodash'
import { FormGroup, FormControl } from 'react-bootstrap'

const input = (data) => {
	// const { input, meta } = data

	const { input, meta, defaultValue, disabled, children } = data
	const { value: inputValue, ...inputRest } = input
	const value = inputValue || defaultValue
	// const validations = _.get(data, 'validations', [])
	// const isReqired = !!_.find(validations, (v) => {
	// 	return ['required', 'non_empty'].indexOf(v) !== -1
	// })
	// console.log(data.input, isReqired)
	const {error, touched} = meta
	let validationState = null
	// const floatlInputClass = data.classList
	let errorText = null
	if (error && touched) {
		validationState = 'error'
		errorText = error
	}
	// console.log(input, data)

	return (
		<FormGroup controlId={input.name} validationState={validationState}>
			<FormControl {...inputRest} disabled={disabled} componentClass="select">
				<option>-----</option>
				{children}
			</FormControl>
			{errorText && value &&
				<div className="alert alert-danger">
		 			<strong>Ошибка!</strong> {errorText}
				</div>
			}
		</FormGroup>
	)
}

export default function FormSelect(data) {
	return <Field {...data}	component={input} />
}
