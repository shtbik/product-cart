import React from 'react'
import { FormattedNumber, FormattedMessage } from 'react-intl'
import _ from 'lodash'


// million	1 with 6
// billion	1 with 9
// trillion	1 with 12
// quadrillion	1 with 15
// quintillion	1 with 18
// sextillion	1 with 21
// septillion	1 with 24
// octillion	1 with 27


const identities = [
	{ value: 1E27, label: 'octillion' },
	{ value: 1E24, label: 'septillion' },
	{ value: 1E21, label: 'sextillion' },
	{ value: 1E18, label: 'quintillion' },
	{ value: 1E15, label: 'quadrillion' },
	{ value: 1E12, label: 'trillion' },
	{ value: 1E9,  label: 'billion' },
	{ value: 1E6,  label: 'million' },
	{ value: 1E3,  label: 'thousand' },
]

const identify = function( num, digits = 0 ) {

	var results = []

	for ( var i = 0; i < identities.length; i++ ) {
		let value = (num / identities[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") * 1
		if( value ) results.push({id: identities[i].label, value})
	}

	return results
}

const humanize = function( config ) {
	let number = config.value
	let digits = config.digits || digits
	let order = config.order || 'min' //min, max, and all above identities

	let ids = identify( number, digits )

	let res 

	if( order == 'min' ) res = _.minBy(ids, id => id.value)
	else if( order == 'max' ) res = _.maxBy(ids, id => id.value)
	else res = _.get(ids, order, 0)

	return res || {id: 'zero', value: 0}
}


export default ( props, context ) => {

	let hrn = humanize( { value: props.value || 0, digits: 1 } )

	return (
		<span>
			<FormattedNumber value={hrn.value} /> &nbsp;
			<FormattedMessage id={`labels.${hrn.id}`} />
		</span>
	)	

}