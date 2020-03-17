import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { find, filter } from 'lodash'

import { getProducts, filterProductsFunc } from 'modules/products'
import { addCart } from 'modules/cart'

class Catalog extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getProducts())
	}

	addToCart = productId => {
		const { products, dispatch } = this.props
		const thisProduct = find(products, { id: productId })
		dispatch(addCart(thisProduct))
	}

	filter = ({ target: { value: filterValue } }) => {
		const { dispatch } = this.props
		// not the most elegant solution :)
		const initialProducts = JSON.parse(localStorage.getItem('initialProducts'))
		if (initialProducts && initialProducts.length && filterValue !== 'all') {
			const filterProducts = filter(initialProducts, { category: filterValue })
			dispatch(filterProductsFunc(filterProducts))
		} else dispatch(filterProductsFunc(initialProducts))
	}

	render() {
		const { products } = this.props
		let productsDiv = null

		if (products && products.length) {
			productsDiv = products.map(({ id, name, img, description, tags, price }) => {
				return (
					<div className="col-md-4 col-sm-4 product" key={id}>
						<div className="main-image">
							<img src={`${process.env.PUBLIC_URL}/img/${img}`} alt={name} />
						</div>
						<p className="name">{name}</p>
						<p>{description}</p>
						<div className="row">
							<div className="col-md-6 col-sm-6 tag">
								<span className="label label-tag">{tags}</span>
							</div>
							<div className="col-md-6 col-sm-6 price">
								<span>{price} $</span>
							</div>
						</div>
						<button className="btn btn-primary" type="button" onClick={() => this.addToCart(id)}>
							Add to cart
						</button>
					</div>
				)
			})
			return (
				<div className="container-catalog">
					<div className="row">
						<div className="col-sm-12 col-md-12">
							<h3 className="text-center">Catalog Products</h3>
							<div className="filter text-right">
								Category:&nbsp;
								<select name="filter" className="form-control" onChange={this.filter}>
									<option value="all">All</option>
									<option value="laptop">Laptop</option>
									<option value="phone">Phone</option>
								</select>
							</div>
							<div className="products">
								<div className="row">{productsDiv}</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12">
						<h3 className="text-center">Can not load products</h3>
					</div>
				</div>
			</div>
		)
	}
}

Catalog.propTypes = {
	dispatch: PropTypes.func.isRequired,
	products: PropTypes.array,
}

Catalog.defaultProps = {
	products: [],
}

const mapStateToProps = ({ products }) => ({ products })
export default connect(mapStateToProps)(Catalog)
