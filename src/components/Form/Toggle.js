import React from 'react'
import Toggle from 'react-toggle'
import { Field } from 'redux-form'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import { injectIntl, FormattedMessage } from 'react-intl'
import cn from 'classnames'


const input = ( props ) => {

	const { input, meta } = props

	const labelId = `labels.${props.label || input.name}`

	const checked = !!input.value
	const value = input.value ? 'yes' : ''
	const className = cn('form-group', 'form-inline', props.className)

	const validations = _.get(props, 'validations', [])
	const isReqired = !!_.find(validations, (v) => ['required', 'non_empty'].indexOf(v.validation_type) != -1 )
	const isReqiredString  = isReqired ? '* ' : ''
	
	const onChange = ( value ) => {
		input.onChange( value )
		if( props.onToggle ) props.onToggle( value )
	}

	//const inputProps = _.omit(input, ['onToggle'])

	return (
		<div className="form-toggle-container">
			<div className="form-toggle">
				<Toggle 
					{...input} 
					value={value} 
					checked={checked} 
					onChange={onChange}
				/>
			</div>
			<div className="form-toggle-label">
				{isReqired}<FormattedMessage defaultMessage={labelId} id={labelId} />
			</div>
			
		</div>
	)
}

export default function FormToggle( props, context ) {
	return <Field {...props} component={input} />
}

