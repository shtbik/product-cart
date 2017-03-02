import React from 'react'
import TopNav from '../containers/TopNav'
import Footer from '../containers/Footer'

export default function NoMatch() {
	return (
		<div>
			<TopNav/>
			<div className="container main-container">
				<div className="row">
					<div className="col-sm-12 col-md-12 text-center">
						<h1>404</h1>
						<h3 className="font-bold">Page not found</h3>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	)
}
