import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeCartCount, deleteCartItem } from 'modules/cart'

class Cart extends Component {
	onChange = event => {
		const { dispatch } = this.props
		const {
			target: {
				value,
				dataset: { id: productId },
			},
		} = event

		dispatch(changeCartCount(value, productId))
	}

	deleteToCart = ({
		target: {
			dataset: { id: productId },
		},
	}) => {
		const { dispatch } = this.props

		dispatch(deleteCartItem(productId))
	}

	render() {
		const { cart } = this.props
		let cartDiv = null
		let totalPrice = 0

		if (cart && cart.length) {
			cartDiv = cart.map(({ id, price, count, img, name }, key) => {
				totalPrice += price * count
				return (
					<tr key={id}>
						<td>
							<b>{key + 1}</b>
						</td>
						<td>
							<img src={`${process.env.PUBLIC_URL}/img/${img}`} alt={name} />
						</td>
						<td>{name}</td>
						<td>{`${price}$`}</td>
						<td>
							<input
								type="text"
								name="count"
								className="form-control"
								data-id={id}
								value={count}
								onChange={this.onChange}
							/>
						</td>
						<td>
							<button className="btn btn-primary" type="button" data-id={id} onClick={this.deleteToCart}>
								Delete
							</button>
						</td>
					</tr>
				)
			})
			return (
				<div className="container-cart">
					<div className="row">
						<div className="col-sm-12 col-md-12">
							<h3 className="text-center">Your order</h3>
							<table className="table table-striped table-cart">
								<thead>
									<tr>
										<th>#</th>
										<th>Image</th>
										<th>Name</th>
										<th>Price for one</th>
										<th>Count</th>
										<th />
									</tr>
								</thead>
								<tbody>
									{cartDiv}
									<tr>
										<td colSpan="6" className="text-right">
											<h3>Total price: {totalPrice}$</h3>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12">
						<h3 className="text-center">Sorry, your cart is empty</h3>
					</div>
				</div>
			</div>
		)
	}
}

Cart.propTypes = {
	dispatch: PropTypes.func.isRequired,
	cart: PropTypes.array,
}

Cart.defaultProps = {
	cart: [],
}

const mapStateToProps = ({ cart }) => ({ cart })
export default connect(mapStateToProps)(Cart)
