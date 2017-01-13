import React from 'react'
import cn from 'classnames'

export default function Row( props ){

	const className = cn('row', props.className)

	return (
		<div className={className}>
			{props.children}
		</div>
	)
}