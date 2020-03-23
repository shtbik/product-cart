import React from 'react'
import PropTypes from 'prop-types'

const ProductCard = ({
	product: { id, name, img, description, tags, price },
	addToCart,
	className,
}) => (
	<div className={className} key={id}>
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
				<span>{price}&nbsp;$</span>
			</div>
		</div>
		<button className="btn btn-primary" type="button" onClick={addToCart(id)}>
			Add to cart
		</button>
	</div>
)

ProductCard.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		tags: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}).isRequired,
	addToCart: PropTypes.func.isRequired,
	className: PropTypes.string,
}

ProductCard.defaultProps = {
	className: '',
}

export default ProductCard
