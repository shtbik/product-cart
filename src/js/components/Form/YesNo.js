import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import { Field } from 'redux-form'
import cn from 'classnames'
import { injectIntl, FormattedMessage } from 'react-intl'
import _ from 'lodash'

class YesNo extends React.Component {

	static get defaultProps(){
		return {
			value: null,
			onChange: _.noop
		}
	}

	onClick( value ){
		console.log(value)
		this.props.onChange(value)
	}

	render(){

		return (
			<div className="btn-group btn-group-sm" role="group">
				<button type="button" className={cn('btn', {'btn-success': this.props.value === true})} onClick={this.onClick.bind(this, true)}>
					<FormattedMessage id="labels.yes" />
				</button>
				<button type="button" className={cn('btn', {'btn-danger': this.props.value === false})} onClick={this.onClick.bind(this, false)}>
					<FormattedMessage id="labels.no" />
				</button>
			</div>
		)
	}
}



const input = ( props ) => {

	const { input, meta } = props
	const labelId = `labels.${props.label || input.name}`
	const className = cn('form-group', 'form-inline', props.className)
	
	const validations = _.get(props, 'validations', [])
	const isReqired = !!_.find(validations, (v) => ['required', 'non_empty'].indexOf(v.validation_type) != -1 )
	const isReqiredString  = isReqired ? '* ' : ''

	return (
		<div className="form-yesno-container">
			<div className="form-yesno">
				<YesNo {...input} defaultValue={props.defaultValue} />
			</div>
			<div className="form-yesno-label">
				{isReqired}<FormattedMessage defaultMessage={labelId} id={labelId} />
			</div>
		</div>
	)

}


export default function FormInput( props, context ) {
	return <Field {...props} component={input} />
}