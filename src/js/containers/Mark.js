import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Link } from 'react-router'
import _ from 'lodash'
import {list_comp_classes} from '../configs/dataMarks'
// import Base from './Base'

class Mark extends React.Component {

	render() {
		// console.log('Переменные: ', list_comp_classes, list_comps, list_comps_values);

		// Выводим все тесты юзера (пройденные или нет за этот квартал)
		const tests = (
			_.map(list_comp_classes, function(item, key) {
				return (
					<div className="col-md-4 col-sm-4 col-xs-12 text-center" key={key}>
						<p><b>Тест "{item.name}"</b></p>
						{item.mark_self ?
							<div>
								<Link to={`/mark/${item.id}`} className="btn btn-success disabled">Тест пройден</Link>
								<p>Оценка за тест "{item.mark_self}"</p>
							</div>
							:
							<Link to={`/mark/${item.id}`} className="btn btn-primary">Пройти тест</Link>
						}
					</div>
				)
			})
		)

		return (
			<div className="container mark">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<h3 className="text-center">Оценка ценностной компетенции</h3>
						<ol>
							<li>
								Поставьте один любой символ напротив одного высказывания, которое соответствовало проявлению каждой компетенции (ответственность, готовность к изменениям, саморазвитие ) в текущем квартале
							</li>
							<li>
								Буква по ценностной компетенции рассчитается автоматически
							</li>
							<li>
								При необходимости заполните поле "Комментарий"
							</li>
							<li>
								Нажмите кнопку "Далее"
							</li>
						</ol>
						<div className="row">
						 	{tests}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const selector = createSelector(
	(state) => state.auth,
	(auth) => {
		return { auth }
	}
)
const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps)(Mark)
