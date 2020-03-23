import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as cartActions from 'modules/cart'

const Cart = ({ cart, changeCartCount, deleteCartItem }) => {
	const onChange = event => {
		const {
			target: {
				value,
				dataset: { id: productId },
			},
		} = event

		changeCartCount(value, productId)
	}

	const deleteToCart = ({
		target: {
			dataset: { id: productId },
		},
	}) => {
		deleteCartItem(productId)
	}

	const totalPrice = useMemo(
		() =>
			cart.reduce((total, { price, count }) => {
				let nextTotal = total
				nextTotal += price * count
				return nextTotal
			}, 0),
		[cart]
	)

	if (!cart.length)
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12">
						<h3 className="text-center">Sorry, your cart is empty</h3>
					</div>
				</div>
			</div>
		)

	return (
		<div className="container-cart">
			<div className="row">
				<div className="col-sm-12 col-md-12">
					<h3 className="text-center">Your order</h3>
					<table className="table table-striped table-cart">
						<thead>
							<tr>
								<th>№</th>
								<th>Image</th>
								<th>Title</th>
								<th>Price</th>
								<th>Count</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{cart.map(({ id, price, count, img, name }, key) => (
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
											onChange={onChange}
										/>
									</td>
									<td>
										<button className="btn btn-primary" type="button" data-id={id} onClick={deleteToCart}>
											Delete
										</button>
									</td>
								</tr>
							))}
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

Cart.propTypes = {
	cart: PropTypes.array.isRequired,
	changeCartCount: PropTypes.func.isRequired,
	deleteCartItem: PropTypes.func.isRequired,
}

const mapStateToProps = ({ cart }) => ({ cart })
const mapDispatchToProps = {
	changeCartCount: cartActions.changeCartCount,
	deleteCartItem: cartActions.deleteCartItem,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cart)
