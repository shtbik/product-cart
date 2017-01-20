import React from 'react'
import { Field } from 'redux-form'

export default function FormInput( props ) {
	return <Field {...props} component="textarea" />
}
