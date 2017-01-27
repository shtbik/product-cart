import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cn from 'classnames'
import _ from 'lodash'
import { transfer } from '../configs/breadcrumbs'
import Base from './Base'


class BreadCurmbs extends Base {

	resolve() {
		// const pathname = this.location('pathname')
		const pathname = window.location.pathname
		// console.log('URL: ', pathname)
		const segments = _.filter( pathname.split('/'), (segment) => {
			return !( (!isNaN(parseFloat(segment)) && isFinite(segment)) || segment.indexOf('-') !== -1 || segment === 'grid' )
		})

		const result = segments.map( (segment, i) => {
			let transferName = null
			if (transfer[segment]) {
				transferName = transfer[segment]
			} else {
				transferName = segment
			}
			const current = segment === '' ? 'Главная' : transferName
			const url = i === 0 ? '/' : segments.slice(0, i + 1).join('/')

			return {
				url: url,
				title: current
			}
			// return {
			// 	url: url,
			// 	title: <FormattedMessage id={`nav.${current}`} />
			// }
		})

		return result
	}

	isHome() {
		// return this.location('pathname') === '/'
		return window.location.pathname === '/'
	}

	render() {
		if (!this.isHome()) {
			const crumbs = this.resolve()
			const breadCrumbs = crumbs.map((crumb, i) => {
				return (
					<li key={i} className={'breadcrumb-item ' + cn({active: i === crumbs.length - 1})}>
						<Link to={crumb.url}>{crumb.title}</Link>
					</li>
				)
			})

			return (
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<ol className="breadcrumb">{breadCrumbs}</ol>
					</div>
				</div>
			)
		}
		return <div/>
	}
}

export default connect(state => state.routing)(BreadCurmbs)
