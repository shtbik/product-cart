import React from 'react'
import { FormControl } from 'react-bootstrap'

export default class InputBase extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
	  return this.props.value !== nextProps.value
	}

	render(){
		return <FormControl {...this.props} />
	}
}