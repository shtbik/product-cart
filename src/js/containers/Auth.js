import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
// import AuthLogin from './AuthLogin'

class Auth extends React.Component {

	static propTypes = {
		children: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

export default Auth
