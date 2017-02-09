import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
// import { Link } from 'react-router'
// import _ from 'lodash'
// import {list_comp_classes} from '../configs/dataMarks'
import { getAllocation } from '../modules/allocation'

class Allocations extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func,
		tests: PropTypes.object,
		auth: PropTypes.object.isRequired
	}

	componentDidMount() {
		const {id} = this.props.auth
		// Используется для идентификации пользователя. За какой период отдавать тесты вычисляем на сервере
		const data = {
			user_id: id
		}
		this.props.dispatch(getAllocation(data))
	}

	render() {
		const year = moment().format('YYYY')
		// Выводим все тесты юзера (пройденные или нет за этот квартал)

		return (
			<div className="container mark">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<h3 className="text-center">Форма целей за {year} год</h3>
						<Link to="/allocation/add">Добавить цель</Link>
						{ /* <ol>
							<li>
								Столбцы C - H заполняются автоматически значениями из листа "План"
							</li>
							<li>
								Столбец I "Факт КПЭ / % выполнения вехи ППР" заполняется для КПЭ: фактическими значениями КПЭ; для ППР - значениями % выполнения ППР на основании оценки Непосредственного руководителя (экспертизы / оценки оценивающего, в зависимости от того, какая важнее)
							</li>
							<li>
								Столбец J "Коэффициент оценки" заполняется для КПЭ вручную соответствующими коэффициентами; для ППР - автоматически на основании шкалы перевода % выполнения ППР в оценку (Таблица 1). В связи с этим, при добавлении строк нужно также копировать соответствующую формулу пересчета Коценки для ППР или удалять ее - для КПЭ
							</li>
							<li>
								В столбцы начиная от K и далее вносятся данные только по оценке ППР и комментарии к выполнению целей
							</li>
							<li>
								Коэффицент выполнения целей Кцели расчитывается в ячейке J9
							</li>
							<li>
								В таблице "Оценка 5+" заполняются столбцы Самооценка и Оценка Непосредственного руководителя. В сводную таблицу попадает оценка Непосредственного руководителя
							</li>
							<li>
								В сводную таблицу попадает коэффициент выполнения целей Кцели, оценка выполнения целей рассчитываетс автоматически по соответствующей шкале (Таблица 2); коэффициент оценки 5+ расчитывается автоматически по соответствующей шкале (Таблица 3); Итоговый коэффициент оценки расчитывается как Кцели X К5+
							</li>
						</ol> */ }
						<div className="row">
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const selector = createSelector(
	(state) => state.auth,
	(state) => state.allocation,
	(auth, allocation) => {
		return { auth, allocation }
	}
)

const mapStateToProps = ( state ) => ({ ...selector(state) })

export default connect(mapStateToProps)(reduxForm({
	form: 'allocations',
	// validate,
	enableReinitialize: true
})(Allocations))
