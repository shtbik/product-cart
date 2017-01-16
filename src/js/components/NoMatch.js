import React from 'react'

export default function NoMatch() {
	return (
		<div className="middle-box text-center animated fadeInDown">
				<h1>404</h1>
				<h3 className="font-bold">Страница не найдена</h3>

				<div className="error-desc">
					Извините, но страница, которую вы ищете, была не найдена. Попробуйте проверить URL на ошибки.
				</div>
		</div>
	)
}
