import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Base from './Base'

//console.log(process.env)

class Home extends Base {

	componentDidMount() {
		this.fetchOne({url: '/user', key: 'users'});
	}
	
	render() {

		//console.log(this.props.test)

		return (
			<div>ASD1</div>
		)
	}
}

const selector = createSelector(
	( state ) => state.content,
	( state ) => state.auth,
	( content, auth ) => {
		return { content, auth }
	}
)
const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps)(Home)