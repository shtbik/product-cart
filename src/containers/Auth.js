import React from 'react'
import { connect } from 'react-redux'

import AuthLogin from './AuthLogin'

class Auth extends React.Component {
	render() {
		return (
			<div className="middle-box text-center loginscreen animated fadeInDown">
				<div className="auth-container">
					{this.props.children}	
					<p className="m-t"><small><strong>Copyright</strong> © АО «Деловая среда»</small></p>
				</div>
			</div>
		)
	}
}


export default Auth