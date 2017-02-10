import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
// import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

import Base from './Base'
// import SearchForm from './SearchForm'
// import { changeLocale } from '../modules/intl'
import { login, logout } from '../modules/auth'

class TopNav extends Base {

	componentDidMount() {
		// console.log(this.props)
	}

	handleClick(to) {
		console.log(to)
		if (to === 'logout') {
			this.props.dispatch(logout())
		}	else if (to === 'login') {
			this.props.dispatch(login())
		}
	}

	// changeLocale(locale) {
	// 	this.props.dispatch(changeLocale({locale: locale}))
	// }

	render() {
		const props = this.props
		// const placeholder = <FormattedMessage id="nav.search" />

		const auth = _.get(props, 'auth', {})
		const {role} = auth
		const userName = [auth.first_name, auth.last_name].join(' ')

		return (
			<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
				<div className="container">
					<button
						className="navbar-toggler navbar-toggler-right"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<a href="#" className="navbar-brand">
						<img src="/img/logo.png" />
					</a>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<IndexLink to="/" className="nav-link" activeClassName="on">Главная</IndexLink>
							</li>
							<li className="nav-item">
								<Link to="/mark" className="nav-link" activeClassName="on">Оценка</Link>
							</li>
							<li className="nav-item">
								<Link to="/allocation" className="nav-link" activeClassName="on">Аллокации</Link>
							</li>
							{
								role === 'admin' ?
								<li className="nav-item">
									<Link to="/grades" className="nav-link" activeClassName="on">Грейды</Link>
								</li> : null
							}
							{
								auth.manager ?
									<li className="nav-item">
										<Link to="/employees" className="nav-link" activeClassName="on">Сотрудники в подчинении</Link>
									</li>
								: null
							}
							<li className="nav-item">
								<Link to="/graphics" className="nav-link" activeClassName="on">Графики результативности</Link>
							</li>
						</ul>
						<span className="form-inline my-2 my-lg-0">
							<ul className="nav profile-widget">
								<li>
									<Link to="/profile" activeClassName="on" className="nav-link">
										<i className="fa fa-user">&nbsp;</i> {userName}
									</Link>
								</li>
								<li>
									<a onClick={this.handleClick.bind(this, 'logout')}>
										<i className="fa fa-sign-out"></i>
										Выйти
									</a>
								</li>
							</ul>
						</span>
					</div>
				</div>

				{ /* <div className="row border-bottom">
					<nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: 0}}>
						<div className="navbar-header">
								<a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i></a>
								<SearchForm placeholder={placeholder} />
						</div>
						<ul className="nav navbar-top-links navbar-right">
							<li>
								<i className="fa fa-user">&nbsp;</i> {userName}
							</li>
							<li>
								<a onClick={this.handleClick.bind(this, 'logout')}>
									<i className="fa fa-sign-out"></i>
									Выйти
								</a>
							</li>
						</ul>
					</nav>
				</div> */ }
			</nav>
		)
	}
}

export default connect( state => {
	return {
		// intl: state.intl,
		nav: state.nav,
		auth: state.auth}
}, null, null, { pure: false })(TopNav)
