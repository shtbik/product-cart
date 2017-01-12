import React, {Component} from 'react'
import List from './SideNav/List'


export default function SideNav ( props, context ) {

	return (
		<nav className="navbar-default navbar-static-side" role="navigation">
			<div className="sidebar-collapse">
				<List config={props.config} {...props} />
			</div> 
		</nav> 
	)
}