import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import { Field } from 'redux-form'
import { injectIntl, FormattedMessage } from 'react-intl'
import cn from 'classnames'

const input = injectIntl( ( props ) => {

	const { intl, input, meta } = props
	const labelId = `labels.${props.label || input.name}`
	const label = intl.formatMessage({id: labelId})

	const errorId = `errors.${meta.error || 'generic'}`
	const error = meta.error && intl.formatMessage({id: errorId})

	const value = input.value || null
	const multi = props.multi || null

	const validations = _.get(props, 'validations', [])
	const isReqired = !!_.find(validations, (v) => ['required', 'non_empty'].indexOf(v.validation_type) != -1 )

	const placeholderValues = _.merge({}, _.get(props, 'placeholder.values', {}), {name: label})
	const placeholderString = props.placeholder ?  
		intl.formatMessage({id: `pl.${props.placeholder.id || input.name}`}, placeholderValues) 
			: intl.formatMessage({id: labelId})

	const placeholder = isReqired ? `* ${placeholderString}` : placeholderString				

	const validationState = meta.error ? 'error' : null
	const floatlInputClass = cn('floatl', {'floatl--active': multi ? _.size(value) : value }, props.className)
	const selectClassName = cn({'Select-async': props.async})
	const isLoading = props.isLoading

	return (
		<FormGroup className={floatlInputClass} controlId={input.name} validationState={validationState}>
			<ControlLabel className="floatl__label">{label}</ControlLabel>
			<Select
				className={selectClassName}
				options={props.options || []}
				simpleValue
				clearable
				searchable
				multi={multi}
				clearAllText=''
				backspaceToRemoveMessage=''
				placeholder={placeholder}
				labelKey={props.valueLabel || 'name'}
				valueKey={props.valueKey || 'id'}
				value={value}
				onBlur={() => {}}
				disabled={props.disabled}
				onChange={(val, items) => {
					var parsedVal

					if( multi ) parsedVal = _.size(val) ? _.map( val.split(','), v => parseInt(v, 10) ) : []
					else parsedVal = val

					input.onChange(parsedVal)
					if( props.onSelect ) props.onSelect(parsedVal)
				}}

				cache={false}
				isLoading={isLoading}
				async={props.async}
				loadOptions={props.loadOptions}
			/>
			<HelpBlock>{error && <span>{error}</span>}</HelpBlock>
		</FormGroup>
	)
})


export default function FormSelect( props ) {
	return (
		<Field {...props}	component={input} />
	)
}