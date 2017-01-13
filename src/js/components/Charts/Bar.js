import React from 'react'
import BaseChart from './Base'
import _ from 'lodash'

class BarChart extends React.Component {
	render() {

		let data = Object.assign({}, {
			labels: [],
			series: [[]]
		}, this.props.data)

		let options = _.merge({}, {			
			axisX: {
				labelInterpolationFnc: function(value, index) {
					return index % 2 === 0 ? value : null
				}
			}
		}, this.props.options)

		return (
			<div>
				<BaseChart data={data} options={options} type="Bar" />
			</div>
		)
	}
}

export default BarChart