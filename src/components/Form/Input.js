import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import { Field } from 'redux-form'
import cn from 'classnames'
import { injectIntl, FormattedMessage } from 'react-intl'


const input = injectIntl( ( props ) => {

	const { intl, input, meta } = props

	const type = props.type || 'text'
	const labelId = `labels.${props.label || input.name}`
	const label = intl.formatMessage({id: labelId})
	const validations = _.get(props, 'validations', [])
	const isReqired = !!_.find(validations, (v) => ['required', 'non_empty'].indexOf(v.validation_type) != -1 )

	const errorId = `errors.${meta.error || 'generic'}`

	const placeholderValues = _.merge({}, _.get(props, 'placeholder.values', {}), {name: label})
	const placeholderString = props.placeholder ?  
		intl.formatMessage({id: `pl.${props.placeholder.id || input.name}`}, placeholderValues) 
			: intl.formatMessage({id: labelId})

	const placeholder = isReqired ? `* ${placeholderString}` : placeholderString

	const error = meta.error && intl.formatMessage({id: errorId})

	
	const validationState = meta.error ? 'error' : null
	const floatlInputClass = cn('floatl', {'floatl--active': input.value || input.value === 0 }, props.className)

	const onChange = ( e ) =>  {
		if( props.onChange ) props.onChange( e )
		return input.onChange( e )
	}

	return (
		<FormGroup className={floatlInputClass} controlId={input.name} validationState={validationState}>
			<ControlLabel className="floatl__label">{placeholder}</ControlLabel>
			<FormControl {...input} type={type} className="floatl__input" placeholder={placeholder} onChange={onChange} />
			<HelpBlock>{error && <span>{error}</span>}</HelpBlock>
		</FormGroup>
	)
})


export default function FormInput( props, context ) {
	return <Field {...props} component={input} />
}