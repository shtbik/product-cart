import React from 'react'
import BaseChart from './Base'

class LineChart extends React.Component {
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
				<BaseChart data={data} options={options} type="Line" />
			</div>
		)
	}
}

export default LineChart