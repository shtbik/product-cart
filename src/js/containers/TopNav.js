import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Link, IndexLink } from 'react-router'

class TopNav extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		cart: PropTypes.array.isRequired
	}

	clearUpdate() {
		// I can programmatically clear redux
		localStorage.clear()
		location.reload()
	}

	render() {
		const { cart } = this.props
		let productInCart = 0
		_.forEach(cart, function(item) {
			productInCart += item.count
		})

		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
				<div className="container">
					<IndexLink to="./" className="navbar-brand">
						LogoCompany
					</IndexLink>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarsExample09"
						aria-controls="navbarsExample09"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarsExample09">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<IndexLink to="./" className="nav-link" activeClassName="on">Index</IndexLink>
							</li>
							<li className="nav-item">
								<Link onClick={::this.clearUpdate} className="nav-link" activeClassName="on">Clear & Update</Link>
							</li>
						</ul>
						<span className="form-inline my-2 my-lg-0">
							<ul className="nav profile-widget">
								<li>
									<Link to="./cart" activeClassName="on" className="nav-link">
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
export default connect(mapStateToProps)(TopNav)
