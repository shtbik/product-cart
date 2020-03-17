import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { clearCart } from 'modules/cart'

const TopNav = ({ cart, dispatch }) => {
	const clearUpdate = () => {
		localStorage.clear()
		dispatch(clearCart())
	}

	const commonCount = useMemo(
		() =>
			cart.reduce((count, product) => {
				let nextCount = count
				nextCount += Number(product.count)
				return nextCount
			}, 0),
		[cart]
	)

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
			<div className="container">
				<NavLink to="/" className="navbar-brand">
					LogoCompany
				</NavLink>
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
							<NavLink to="/" onClick={clearUpdate} className="nav-link" activeClassName="on">
								Clear & Update
							</NavLink>
						</li>
					</ul>
					<span className="form-inline my-2 my-lg-0">
						<ul className="nav profile-widget">
							<li>
								<NavLink to="/cart" activeClassName="on" className="nav-link">
									Cart
									{commonCount ? <span className="label-cart">{commonCount}</span> : null}
									&nbsp;
									<i className="fa fa-shopping-basket" />
								</NavLink>
							</li>
						</ul>
					</span>
				</div>
			</div>
		</nav>
	)
}

TopNav.propTypes = {
	cart: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ cart }) => ({ cart })
export default connect(mapStateToProps)(TopNav)
