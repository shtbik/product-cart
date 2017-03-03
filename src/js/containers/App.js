import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TopNav from './TopNav'
import Footer from './Footer'

class App extends React.Component {

	static propTypes = {
		children: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				<TopNav />
				<div className="container main-container">
					{this.props.children}
				</div>
				<Footer />
			</div>
		)
	}
}

export default connect()(App)
