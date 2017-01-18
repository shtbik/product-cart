import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {Tabs, Tab} from 'react-bootstrap-tabs';
import _ from 'lodash'
import {list_comp_classes, list_comps, list_comps_values} from '../configs/dataMarks'
// import Base from './Base'

class Mark extends React.Component {

	render() {
		console.log('Переменные: ', list_comp_classes, list_comps, list_comps_values);

		// Выводим все тесты юзера (пройденные или нет за этот квартал)
		const tests = (
			_.map(list_comp_classes, function(item, key) {
				return (
					<div className="col-md-4 col-sm-4 col-xs-12 text-center" key={key}>
						<p>Тест "{item.name}"</p>
						{item.mark_self ?
							<div>
								<p>Оценка за тест "{item.mark_self}"</p>
								<button type="button" className="btn btn-success disabled">Тест пройден</button>
							</div>
							:
							<div>
								<p><br /></p>
								<button type="button" className="btn btn-primary">Пройти тест</button>
							</div>
						}
					</div>
				)
			})
		)

		return (
			<div className="container">
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

						<Tabs onSelect={(index, label) => console.log(label + ' selected')}>
							<Tab label="Я - лидер">
								<div className="row">
									<table className="table">
										<thead>
											<tr>
												<th>Оценка по компетенциям</th>
												<th>Самооценка</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Систематически не выполняет свои обязанности (качество и сроки), перекладывает ответственность на коллег и подчиненных. Не признает или скрывает свои недоработки, ошибки своего подразделения, не принимает ответственность за свои управленческие решения. Повторяет допущенные ранее ошибки, не исправляет отклонения системно приводящие к реализации рисков. Использует ресурсы Банка в своих интересах.</td>
												<td className="text-center">
													<input type="radio" name="optradio"/>
												</td>
											</tr>
											<tr>
												<td>Иногда допускает отклонения по качеству или срокам выполнения своих обязанностей. Относится формально к своим обязанностям, часто делегирует принятие управленческих решений в зоне своей ответственности своим подчиненным, либо эскалирует на уровень выше, не принимает ответственность за их результат. Оправдывает неудачи внешними обстоятельствами, действиями подчиненных, коллег, смежных подразделений и др. Нерационально расходует ресурсы и средства Банка.</td>
												<td className="text-center">
													<input type="radio" name="optradio"/>
												</td>
											</tr>
											<tr>
												<td>Вовремя и качественно выполняет свои обязанности, даже в сложных обстоятельствах, всегда принимает личную ответственность за результаты своих действий, управленческих решений и действий своей команды. Берет дополнительную ответственность за реализацию совместных проектов в смежных областях. Системно выявляет риски в работе подразделения, оптимизирует их уровень, возможность повторения и последствия. Организует работу подразделения с точки зрения ответственно и рационального использования ресурсов и средств Банка, пытается оптимизировать расходы ресурсов Банка.</td>
												<td className="text-center">
													<input type="radio" name="optradio"/>
												</td>
											</tr>
											<tr>
												<td>Обеспечивает выполнение задач подразделения с высоким качеством, даже в сложных обстоятельствах, является примером ответственности в рамках подразделения. Активно включается в реализацию проектов, которые влияют на работу Банка в целом. Его подразделение задает стандарты исполнения в рамках функционального блока/ТБ/ПЦП. Предлагает и реализует глобальные подходы по оптимизации расходов Банка не только в своей, но и в смежных сферах.</td>
												<td className="text-center">
													<input type="radio" name="optradio"/>
												</td>
												<td>
												</td>
											</tr>
										</tbody>
									</table>
									<textarea className="form-control" rows="5"></textarea>
								</div>
							</Tab>
							<Tab label="Мы - команда">
								тест 2
							</Tab>
							<Tab label="Все - для клиента">
								тест 3
							</Tab>
						</Tabs>
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
