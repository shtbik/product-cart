import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

const refreshInterval = 60000 * 1 // every minute


class App extends React.Component {

	render() {

		return (
			<div id="wrapper">
				<div id="page-wrapper" className="gray-bg">
					<div className="wrapper wrapper-content">
						{this.props.children}
					</div>	
				</div>
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