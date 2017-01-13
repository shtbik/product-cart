import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import cn from 'classnames'
import { FormattedMessage } from 'react-intl'


class FocusingInput extends React.Component {

	constructor( props ){
		super( props )
		this.state = {
			value: props.initialValue
		}
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).select()
	}

	handleChange( e ) {

		const { onChange = _.noop } = this.props
		const value = e.currentTarget.value

		this.setState({ value })
		onChange( value )
	}

	render(){
		const { onChange, initialValue, className } = this.props
		const { value } = this.state
		return <input className={cn(className)} value={value} onChange={::this.handleChange} type="text" name="title" />
	}
}



class EditableList extends React.Component {

	static get initialState(){
		return {
			adding: false,
			editing: false,
			deleting: false,
			submitting: false,
			index: 0,
			value: '',
			item: {}
		}
	}

	constructor( props ){
		super(props)
		this.state = EditableList.initialState
	}

	onChange( value ) {
		this.setState( { value } )
	}

	startAdd() {
		const state = Object.assign({}, EditableList.initialState, {index: -1, adding: true})
		this.setState( state )
	}

	startEdit( index, item ) {
		const state = Object.assign({}, EditableList.initialState, {editing: true, index, item})
		this.setState( state )
	}
	
	startDelete( index, item ) {
		const state = Object.assign({}, EditableList.initialState, {deleting: true, index, item})
		this.setState( state )	
	}

	cancel() {
		this.setState( EditableList.initialState )
	}


	onSave() {
		this.setState( {submitting: true} )
		this.props.onSave( Object.assign( {}, this.state ), ( res ) => {
			this.setState( EditableList.initialState )
		})
		
	}

	onDelete() {
		this.setState( {submitting: true} )
		this.props.onDelete( Object.assign( {}, this.state ), ( res ) => {
			this.setState( EditableList.initialState )
		})
	}

	onCreate() {
		this.setState( {submitting: true} )
		this.props.onCreate( Object.assign( {}, this.state ), ( res ) => {
			this.setState( EditableList.initialState )
		})
	}

	renderAddition(){

		const { submitting, adding, editing, deleting, index } = this.state
		const rowClassName = cn('editable-list-item')

		if( adding ) {
			return (
				<div className={rowClassName}>
					<FocusingInput disabled={submitting} onChange={::this.onChange} initialValue="" />
					<button disabled={submitting} onClick={::this.onCreate} type="button" className={cn('btn btn-xs btn-success')}>
						<i className="fa fa-check" aria-hidden="true">&nbsp;</i>
						<FormattedMessage id="labels.add" />
					</button>
					<button disabled={submitting} onClick={::this.cancel} type="button" className={cn('btn btn-xs btn-default')}>
						<i className="fa fa-times" aria-hidden="true">&nbsp;</i>
						<FormattedMessage id="labels.cancel" />
					</button>
				</div>
			)
		} else {
			return (
				<div className={rowClassName}>
					<button onClick={::this.startAdd} type="button" className="btn btn-xs btn-warning btn-block">
						<i className="fa fa-plus-circle">&nbsp;</i>
						<FormattedMessage id="labels.add" />
					</button>
				</div>
			)
		}
	}

	renderItem( item, i ) {

		const { submitting, editing, deleting, index } = this.state
		
		if( index == i && editing ) {
			return (
				<div className="editable-list-item" key={i}>
					<FocusingInput key={i} onChange={::this.onChange} initialValue={item.title} />
					<button onClick={::this.onSave} type="button" className="btn btn-xs btn-success">
						<i className="fa fa-check" aria-hidden="true">&nbsp;</i>
						<FormattedMessage id="labels.save" />
					</button>
					<button onClick={::this.cancel} type="button" className="btn btn-xs btn-default">
						<i className="fa fa-times" aria-hidden="true">&nbsp;</i>
						<FormattedMessage id="labels.cancel" />
					</button>
				</div>
			) 
		} else if( index == i && deleting ) {
			return (
				<div className="editable-list-item" key={i}>
					<div className="editable-list-item-label">{item.title}</div>
					<button disabled={submitting} onClick={this.onDelete.bind(this, i, item)} type="button" className={cn('btn btn-xs btn-danger')}>
						<i className="fa fa-check" aria-hidden="true">&nbsp;</i>
						<FormattedMessage id="labels.delete" />
					</button>
					<button disabled={submitting} onClick={::this.cancel} type="button" className={cn('btn btn-xs btn-default')}>
						<i className="fa fa-times" aria-hidden="true">&nbsp;</i>
						<FormattedMessage id="labels.cancel" />
					</button>
				</div>
			) 
		}	else {
			return (
				<div className="editable-list-item" key={i}>
					<div className="editable-list-item-label">{item.title}</div>
					<button className="btn btn-success btn-xs" onClick={this.startEdit.bind(this, i, item)}>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</button>
					<button className="btn btn-danger btn-xs" onClick={this.startDelete.bind(this, i, item)}>
						<i className="fa fa-trash-o" aria-hidden="true"></i>
					</button>
				</div>
			) 
		} 
	}

	render(){

		const { items } = this.props
		return (
			<div className="editable-list">
				{this.renderAddition()}
				{_.map(items, (item, i) => {
					return this.renderItem( item, i )
				})}
			</div>
		)
	}

}


export default EditableList