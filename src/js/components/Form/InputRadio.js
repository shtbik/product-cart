import React from 'react'
import { Field } from 'redux-form'
// import _ from 'lodash'
import { FormGroup, FormControl } from 'react-bootstrap'

const input = (data) => {
	// const { input, meta } = data

	const { input, meta, type, disabled } = data
	const { ...inputRest } = input
	// const value = inputValue || defaultValue
	// const validations = _.get(data, 'validations', [])
	// const isReqired = !!_.find(validations, (v) => {
	// 	return ['required', 'non_empty'].indexOf(v) !== -1
	// })
	// console.log(data.input, isReqired)
	const placeholder = data.placeholder
	const {error} = meta
	const validationState = error ? 'error' : null
	// let errorBlock = null
	// if (error && touched) {
	// 	errorBlock = (
	// 		<div className="alert alert-danger">
	// 			<strong>Ошибка!</strong> {error}.
	// 		</div>
	// 	)
	// } else if (isReqired && !data.input.value) {
	// 	errorBlock = (
	// 		<div className="alert alert-danger">
	// 			<strong>Ошибка!</strong> Поле обязательно к заполнению.
	// 		</div>
	// 	)
	// }

	// const onChange = (e) => {
	// 	if (data.onChange) data.onChange(e)
	// 	return input.onChange(e)
	// }

	return (
		<FormGroup controlId={input.name} validationState={validationState}>
			<FormControl {...inputRest} disabled={disabled} type={type ? type : 'text'} placeholder={placeholder} />
		</FormGroup>
	)
}

export default function FormInput(data) {
	return <Field {...data} component={input} />
}
