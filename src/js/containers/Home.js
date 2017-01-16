import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Base from './Base'

class Home extends Base {

	render() {
		// console.log(this.props.test)
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12">
						<h3 className="text-center">Проект "Оценка сотрудников и аллокация ресурсов по проектам"</h3>
					</div>
				</div>
			</div>
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
