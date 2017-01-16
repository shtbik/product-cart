import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TopNav from './TopNav'
import BreadCrumbs from './BreadCrumbs'
import Footer from './Footer'
// import { createSelector } from 'reselect'
// const refreshInterval = 300000 * 1 // every minute

class App extends React.Component {

	static propTypes = {
		children: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				<TopNav/>
				<div className="container main-container">
					<BreadCrumbs/>
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

// const selector = createSelector(
// 	( state ) => state.meta,
// 	( meta ) => {
// 		return { meta }
// 	}
// )
// const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect()(App)
