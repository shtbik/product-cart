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
				<TopNav/>
				<div className="container main-container">
					<div className="row">
						<div className="col-sm-12 col-md-12">
							{this.props.children}
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		)
	}
}

export default connect()(App)
