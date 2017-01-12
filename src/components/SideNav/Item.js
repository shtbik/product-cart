import React, {Component} from 'react'
import _ from 'lodash'
import cn from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'


export default function SideBarItem ( props, context ) {

	const { index, active, icon, title, children, url } = props
	const onClick = props.onClick || _.noop

	const renderTitle = ( child ) => child.name || <FormattedMessage id={child.title} />



	const navChildren = ( children ) => {
		if( !_.size(children) ) return ''

		// <a onClick={onClick.bind(this, child.url)}>
		// 	{renderTitle(child)}
		// </a>			

		return (
			<ul className="nav nav-second-level">
				{_.map(children, (child, j) =>  (
					<li key={j}>
						<Link to={child.url}>{renderTitle(child)}</Link>
					</li>
				))}
			</ul>
		)
	}

	return (
		<li className={cn({active})} key={index}>
			<a>
				<i className={cn('fa', icon)}></i> 
				<span className="nav-label">
					<FormattedMessage id={title} />
				</span>
			</a>
			{navChildren(children)}
		</li>
	)

}