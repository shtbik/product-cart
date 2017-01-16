import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'
import cmp from 'semver-compare'
import cn from 'classnames'

class Footer extends React.Component {

	static propTypes = {
		meta: PropTypes.number
	}

	render() {
		const {meta} = this.props
		const serverVersion = _.get(meta, 'version', '0.0.0')
		const clientVersion = _.get(process.env, 'VER', '0.0.0')

		const serverVersionIsAhead = cmp(serverVersion, clientVersion) === 1

		return (
			<div className="footer">
				<div className="container">
					<div className="pull-left">
						<strong>Copyright</strong> © АО «Деловая среда»
					</div>
					<div className="pull-right">
						<span className={cn('label', {'label-success': !serverVersionIsAhead, 'label-danger': serverVersionIsAhead})}>
							<i className="fa fa-code-fork" aria-hidden="true"></i> {clientVersion}
						</span>
						{ /* &nbsp;
						<span className="label label-success"><i className="fa fa-code-fork" aria-hidden="true"></i> {serverVersion}</span> */ }
					</div>
				</div>
			</div>
		)
	}
}

const selector = createSelector(
	( state ) => state.meta,
	( meta ) => {
		return { meta }
	}
)

const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps)(Footer)
