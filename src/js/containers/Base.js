import React, { PropTypes } from 'react'

import {
	fetchOne,
	fetchContent,
	fetchConcurrent,
	fetchCascade,
	fetchMore,
	fetchAgain,
	refetchOne,
	receiveContent,
	clearContent,
	deleteOne,
	postOne,
	patchOne,
	modifyByIndex,
	markAsSelected
} from '../modules/content'

class Base extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func
	}

	setContent(payload) {
		this.props.dispatch( receiveContent(payload) )
	}

	modifyByIndex(payload) {
		this.props.dispatch( modifyByIndex(payload) )
	}

	markAsSelected(payload) {
		this.props.dispatch( markAsSelected(payload) )
	}

	fetchOne(params) {
		this.props.dispatch( fetchOne( params ) )
	}

	refetchOne(params) {
		this.props.dispatch( refetchOne( params ) )
	}

	fetchConcurrent(params) {
		this.props.dispatch( fetchConcurrent( params ) )
	}

	fetchCascade(params) {
		this.props.dispatch( fetchCascade( params ) )
	}

	clearContent(params) {
		this.props.dispatch( clearContent( params ) )
	}

	deleteOne(params) {
		this.props.dispatch( deleteOne( params ) )
	}

	patchOne(params) {
		this.props.dispatch( patchOne( params ) )
	}

	postOne(params) {
		this.props.dispatch( postOne( params ) )
	}

	fetchContent(params) {
		this.props.dispatch( fetchContent( params ) )
	}

	fetchMore(params) {
		this.props.dispatch( fetchMore( params ) )
	}

	fetchAgain(params) {
		this.props.dispatch( fetchAgain( params ) )
	}

	// location( key ) {
	// 	const location = this.props.location || this.props.locationBeforeTransitions
	// 	return key ? location[key] : location
	// }
}

export default Base
