import React from 'react'
import { Field } from 'redux-form'
import cn from 'classnames'
import { injectIntl } from 'react-intl'
import moment from 'moment'

import DateAdvancedBase from './DateAdvancedBase'


const input = injectIntl( ( props ) => {

	const { intl, input, meta } = props
	const labelId = `labels.${props.label || input.name}`
	const label = intl.formatMessage({id: labelId})

	const errorId = `errors.${meta.error || 'generic'}`
	const error = meta.touched && meta.error && intl.formatMessage({id: errorId})

	const validations = _.get(props, 'validations', [])
	const isReqired = !!_.find(validations, (v) => ['required', 'non_empty'].indexOf(v.validation_type) != -1 )

	const placeholderValues = _.merge({}, _.get(props, 'placeholder.values', {}), {name: label})
	const placeholderString = props.placeholder ?  
		intl.formatMessage({id: `pl.${props.placeholder.id || input.name}`}, placeholderValues) 
			: intl.formatMessage({id: labelId})		

	const placeholder = isReqired ? `* ${placeholderString}` : placeholderString		

	const value = input.value || null
	const dateFormat = props.dateFormat || 'DD.MM.YYYY'
	
	const validationState = meta.touched && meta.error ? 'error' : null
	const floatlInputClass = cn('floatl', {'floatl--active': value }, props.className)

	return (
		<DateAdvancedBase 
			onChange={input.onChange} 
			value={value} 
			defaultValue={props.defaultValue} 
			error={error} 
			placeholder={placeholder} 
		/>
	)
})


export default function FormInput( props, context ) {
	return <Field {...props} component={input} />
}