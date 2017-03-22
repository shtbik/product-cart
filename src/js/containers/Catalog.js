import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getProducts, filterProductsFunc } from '../modules/products'
import { addCart } from '../modules/cart'

class Catalog extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		products: PropTypes.array
	}

	componentDidMount() {
		this.props.dispatch(getProducts())
	}

	addToCart = (productId) => {
		const { products } = this.props
		const thisProduct = _.find(products, {id: productId})
		this.props.dispatch(addCart(thisProduct))
	}

	filter(event) {
		// not the most elegant solution :)
		const initialProducts = JSON.parse(localStorage.getItem('initialProducts'))
		if (initialProducts && initialProducts.length && event.target.value !== 'all') {
			const filterProducts = _.filter(initialProducts, {'category': event.target.value})
			this.props.dispatch(filterProductsFunc(filterProducts))
		} else {
			this.props.dispatch(filterProductsFunc(initialProducts))
		}
	}

	render() {
		const { products } = this.props
		let productsDiv = null
		const _this = this
		if (products && products[0]) {
			productsDiv = _.map(products, function(item, key) {
				return (
					<div className="col-md-4 col-sm-4 product" key={key}>
						<div className="main-image">
							<img src={`./img/${item.img}`} alt={item.name} />
						</div>
						<p className="name">{item.name}</p>
						<p>{item.description}</p>
						<div className="row">
							<div className="col-md-6 col-sm-6 tag">
								<span className="label label-tag">{item.tags}</span>
							</div>
							<div className="col-md-6 col-sm-6 price">
								<span>{item.price} $</span>
							</div>
						</div>
						<button className="btn btn-primary" onClick={_this.addToCart.bind(this, item.id, event)}>Add to cart</button>
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
								<select
									name="filter"
									className="form-control"
									onChange={::this.filter}
								>
									<option value="all">All</option>
									<option value="laptop">Laptop</option>
									<option value="phone">Phone</option>
								</select>
							</div>
							<div className="products">
								<div className="row">
									{productsDiv}
								</div>
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

const selector = createSelector(
	( state ) => state.products,
	( products ) => {
		return { products }
	}
)
const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps)(Catalog)
