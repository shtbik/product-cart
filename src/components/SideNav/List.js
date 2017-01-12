import React, {Component} from 'react'
import _ from 'lodash'
import cn from 'classnames'

import Item from './Item'


export default function SideBarList ( props, context ) {

	const { config, order, onItemClick } = props
	const codes = _.union( order, _.map(config, section => section.code) )

	const nav = _.reduce( codes, (res, code, index) => {
		const section = _.find(config, {code})
		if( section ) res.push(<Item key={index} index={index} {...section} onClick={onItemClick} />)
		return res
	}, [])

	// const nav = _.map(config, (section, index) => {
	// 	return (
	// 		<Item key={index} index={index} {...section} onClick={onItemClick} />
	// 	)
	// })

	return (<ul className="nav" id="side-menu">{nav}</ul>)
}