import React from 'react'
import cn from 'classnames'

export default function Col( props ){

	const classes = props.className ? props.className.split(' ') : ['col']
	if( props.xs ) classes.push('col-xs-' + props.xs)
	if( props.sm ) classes.push('col-sm-' + props.sm)
	if( props.md ) classes.push('col-md-' + props.md)
	if( props.lg ) classes.push('col-lg-' + props.lg)

	const attributes = _.omit(props, ['xs', 'sm', 'md', 'lg'])	

	return (
		<div {...attributes} className={cn('col', classes)}>
			{props.children}
		</div>
	)
}