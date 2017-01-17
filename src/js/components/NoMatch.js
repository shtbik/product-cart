import React from 'react'
import TopNav from '../containers/TopNav'
import BreadCrumbs from '../containers/BreadCrumbs'
import Footer from '../containers/Footer'

export default function NoMatch() {
	return (
		<div>
			<TopNav/>
			<div className="container main-container">
				<BreadCrumbs/>
				<div className="row">
					<div className="col-sm-12 col-md-12 text-center">
						<h1>404</h1>
						<h3 className="font-bold">Страница не найдена</h3>

						<div className="error-desc">
							Извините, но страница, которую вы ищете, была не найдена. Попробуйте проверить URL на ошибки.
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	)
}
