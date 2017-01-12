import React from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import moment from 'moment'
import cn from 'classnames'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Field } from 'redux-form'
import onClickOutside from 'react-onclickoutside'


class YearMonthForm extends React.Component {

	constructor( props ){

		super( props )

		const months = _.range(0, 12)
		const years = []
		const { date, fromMonth, toMonth, fromYear, toYear } = props

		for ( let i = fromYear; i <= toYear; i++ ) {
			years.unshift(i)
		}

		this.state = {
			fromMonth: props.fromMonth,
			toMonth: props.toMonth,
			fromYear: props.fromYear,
			toYear: props.toYear,
			month: date.getMonth(),
			year: date.getFullYear(),
			years,
			months,
			date
		}
	}

	handleMonthChange( e ){
		const month = e.target.value
		const year = this.state.year
		this.props.onChange( new Date(year, month) )
		this.setState({month})
	}

	handleYearChange( e ){
		const month = this.state.month
		const year = e.target.value
		this.props.onChange( new Date(year, month) )
		this.setState({month, year})
	}

	render ( ) {

	 	const props = this.props
	 	const state = this.state
		//const { intl, date, localeUtils, onChange, fromMonth, toMonth, fromYear, toYear } = props
		
		const { intl, date, localeUtils, onChange } = props
		const { fromMonth, toMonth, fromYear, toYear, years, months } = state
	
		const handleChange = (e) => {
			const { year, month } = e.target.form
			onChange( new Date(year.value, month.value) )
		}

		return (
			<div className="DayPicker-Caption">
				<select className="form-ymd-component-month" name="month" onChange={::this.handleMonthChange} value={date.getMonth()}>
					{months.map((month, i) =>
						<option key={i} value={i}>
							{intl.formatDate(moment().month(month).toDate(), {month: 'long'})}
						</option>)
					}
				</select>
				<select className="form-ymd-component-year" name="year" onChange={::this.handleYearChange} value={date.getFullYear()}>
					{ years.map((year, i) =>
						<option key={i} value={year}>
							{year}
						</option>)
					}
				</select>
			</div>
		)
	}
}


class DateAdvancedBase extends React.Component {

	constructor( props ) {
		super( props )

		const date = props.value || new Date()
		const fromYear = props.fromYear || moment().subtract(100, 'years').toDate().getFullYear()
		const toYear = props.toYear || (new Date()).getFullYear()
		const fromMonth = props.fromMonth || new Date(fromYear, 0, 1, 0, 0)
		const toMonth = props.toMonth || new Date(toYear, 11, 31, 23, 59)
		const initialMonth = new Date(date.getFullYear(), date.getMonth(), 1)
		
		this.state = { 
			hidden: props.hidden,
			fromYear, 
			toYear, 
			fromMonth, 
			toMonth,
			value: props.value || props.defaultValue || '',
			date: date,
			month: initialMonth,
			initialMonth: initialMonth
		}
	}

	static get defaultProps() {
		return {
			value: '',
			defaultValue: '',
			hidden: true,
			onChange: _.noop
		}
	}

	handleDayClick( e, day,  { selected } ){

		const updateState = {
			value: day,
			month: day,
			selectedDay: selected ? null : day,
			hidden: true
		}

		const state = _.merge({}, this.state, updateState)

		this.setState(state)
		this.props.onChange(day)
	}

	hidePicker(){
		const state = _.merge({}, this.state, {hidden: true})
		this.setState(state)
	}

	showCurrentDate() {
		const state = _.merge({}, this.state, {hidden: false})
		this.setState(state)
		this.refs.daypicker.showMonth(this.state.month)
	}

	handleInputChange( e ) {
		const { value } = e.target
		const state = _.merge({}, this.state, {value})
	}

	

	handleClickOutside(){
		this.hidePicker()
	}

	render() {

		const state = this.state
		const props = this.props

		const { intl } = props		
		const { fromYear, toYear, fromMonth, toMonth } = state
		const placeholder = props.placeholder || ''
		const error = props.error || '' 
		const value = state.value ? intl.formatDate(state.value) : ''

		const containerClassName = cn('form-ymd-container', {'hidden-component': state.hidden, 'has-error': !!error})
		const componentClassName = cn('form-ymd-component')
		const floatlInputClass = cn('input-group', 'floatl', {'floatl--active': value, 'has-error': !!error }, props.className)

		return (

			<div className={containerClassName}>

				<div className={floatlInputClass}>

				  <span className="input-group-addon" onClick={::this.showCurrentDate}>
				  	<i className="fa fa-calendar" aria-hidden="true"></i>
				  </span>
				  <ControlLabel className="floatl__label">{placeholder}</ControlLabel>
				  
				  <input
						ref="input"
						type="text"
						className="form-control floatl__input form-ymd-input"
						value={value}
						readOnly={true}
						placeholder={placeholder}
						onChange={::this.handleInputChange}
						onFocus={::this.showCurrentDate}
					/>

				</div>

				<HelpBlock>{error && <span>{error}</span>}</HelpBlock>
						
				<DayPicker
					ref="daypicker"
					className={componentClassName}
					initialMonth={this.state.initialMonth}
					fromMonth={ fromMonth }
					toMonth={toMonth}
					onDayClick={ ::this.handleDayClick }
					selectedDays={day => DateUtils.isSameDay(state.selectedDay, day) }
					captionElement={
						<YearMonthForm 
							fromMonth={fromMonth} 
							toMonth={toMonth} 
							fromYear={fromYear} 
							toYear={toYear} 
							intl={intl}
							onChange={ initialMonth => this.setState({ initialMonth }) } 
						/>
					}
				/>

			</div>
		)
	}

}

export default injectIntl(onClickOutside(DateAdvancedBase))