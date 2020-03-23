import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as productsActions from 'modules/products'
import * as cartActions from 'modules/cart'

import Card from 'components/Card'

const Catalog = ({ products, filter, getProducts, filterProducts, addCart }) => {
	useEffect(() => {
		if (!products.length) getProducts()
	}, [products, getProducts])

	const addToCart = productId => () => {
		const thisProduct = products.find(({ id }) => id === productId)
		addCart(thisProduct)
	}

	const filterChange = ({ target: { value } }) => {
		const initialProducts = JSON.parse(localStorage.getItem(productsActions.INITIAL_PRODUCTS_KEY))
		let nextProducts = initialProducts
		if (value !== 'all') {
			nextProducts = nextProducts.filter(({ category }) => category === value)
		}
		filterProducts({ products: nextProducts, filter: value })
	}

	if (!products || !products.length)
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12">
						<h3 className="text-center">Loading products...</h3>
					</div>
				</div>
			</div>
		)

	return (
		<div className="container-catalog">
			<div className="row">
				<div className="col-sm-12 col-md-12">
					<h3 className="text-center">Catalog Products</h3>
					<div className="filter text-right">
						Category:&nbsp;
						<select name="filter" value={filter} className="form-control" onChange={filterChange}>
							<option value="all">All</option>
							<option value="laptop">Laptop</option>
							<option value="phone">Phone</option>
						</select>
					</div>
					<div className="products">
						<div className="row">
							{products.map(product => (
								<Card
									key={product.id}
									product={product}
									addToCart={addToCart}
									className="col-md-4 col-sm-6 product"
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Catalog.propTypes = {
	getProducts: PropTypes.func.isRequired,
	filterProducts: PropTypes.func.isRequired,
	addCart: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
	filter: PropTypes.string.isRequired,
}

const mapStateToProps = ({ products: { data: products, filter } }) => ({ products, filter })
const mapDispatchToProps = {
	getProducts: productsActions.getProducts,
	filterProducts: productsActions.filterProducts,
	addCart: cartActions.addCart,
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Catalog)
