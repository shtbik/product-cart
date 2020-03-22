import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import * as cartActions from 'modules/cart'

// TODO: move to component, remove redux
const TopNav = ({ cart, clearCart }) => {
	const [isCollapsed, toggleCollapse] = useState(true)

	const clearUpdate = () => {
		clearCart()
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

	const navbarClasses = isCollapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show'
	const collapseBtnClasses = isCollapsed ? 'navbar-toggler collapsed' : 'navbar-toggler'

	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light rounded">
			<div className="container">
				<NavLink to="/" className="navbar-brand">
					ProductsCart
				</NavLink>
				<button
					type="button"
					onClick={() => toggleCollapse(!isCollapsed)}
					className={collapseBtnClasses}
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className={navbarClasses}>
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink to="/" onClick={clearUpdate} className="nav-link" activeClassName="on">
								Clear Cart
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
	clearCart: PropTypes.func.isRequired,
}

const mapStateToProps = ({ cart }) => ({ cart })
const mapDispatchToProps = { clearCart: cartActions.clearCart }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TopNav)
