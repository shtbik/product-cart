import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { createSelector } from 'reselect'
import { getProducts } from '../modules/products'
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

	render() {
		const { products } = this.props
		let productsDiv = null
		const _this = this
		if (products && products[0]) {
			productsDiv = _.map(products, function(item, key) {
				return (
					<div className="col-md-4 col-sm-4 product" key={key}>
						<div className="main-image">
							<img src={`/img/${item.img}`} alt={item.name} />
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
				<div className="container container-catalog">
					<div className="row">
						<div className="col-sm-12 col-md-12">
							<h3 className="text-center">Catalog Products</h3>
							<div className="row products">
								{productsDiv}
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
