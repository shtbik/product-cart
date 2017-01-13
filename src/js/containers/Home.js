import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Base from './Base'

class Home extends Base {

	render() {
		// console.log(this.props.test)
		return (
			<div>Проект "Деловая оценка и аллокация"</div>
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
