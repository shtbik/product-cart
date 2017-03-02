import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { createSelector } from 'reselect'
import { Link, IndexLink } from 'react-router'

class TopNav extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		cart: PropTypes.array.isRequired
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log('AddCart', nextProps.cart)
		// console.log('asd', nextProps.cart)
		// if (nextProps.cart !== this.props.cart) {
		// }
	// }

	// handleClick(to) {
	// 	console.log(to)
	// 	if (to === 'logout') {
	// 		this.props.dispatch(logout())
	// 	}	else if (to === 'login') {
	// 		this.props.dispatch(login())
	// 	}
	// }

	// changeLocale(locale) {
	// 	this.props.dispatch(changeLocale({locale: locale}))
	// }

	render() {
		const { cart } = this.props
		let productInCart = 0
		_.forEach(cart, function(item) {
			productInCart += item.count
		})
		// console.log(productInCart)

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
						LogoCompany
					</a>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<IndexLink to="/" className="nav-link" activeClassName="on">Index</IndexLink>
							</li>
						</ul>
						<span className="form-inline my-2 my-lg-0">
							<ul className="nav profile-widget">
								<li>
									<Link to="/cart" activeClassName="on" className="nav-link">
										Cart
										{cart && cart.length && productInCart ?
											<span className="label-cart">{productInCart}</span>
											: null
										}
										&nbsp;<i className="fa fa-shopping-basket"></i>
									</Link>
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

const selector = createSelector(
	( state ) => state.cart,
	( cart ) => {
		return { cart }
	}
)
const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps, null, null, { pure: false })(TopNav)
