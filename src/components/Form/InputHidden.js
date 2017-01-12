import React from 'react'
import { Field } from 'redux-form'

export default function FormInputHidden( props, context ) {
	return <Field {...props} type="hidden" component="input" />
}