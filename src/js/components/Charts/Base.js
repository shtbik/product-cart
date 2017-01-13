import React, {Component} from 'react'
import Chartist from 'chartist'

class BaseChart extends Component {


	static get propTypes()  {

		return { 
			type: React.PropTypes.string.isRequired,
			data: React.PropTypes.object.isRequired,
			className: React.PropTypes.string,
			options: React.PropTypes.object,
			responsiveOptions: React.PropTypes.array,
			style: React.PropTypes.object
		}
	}

	componentWillReceiveProps( nextProps ) {
		this.updateChart( nextProps )
	}

	componentWillUnmount() {
		this.chartist.detach()
	}

	componentDidMount() {
		this.updateChart( this.props )
	}

	updateChart( config ) {

		//make sure that the DOM element is mounted
		if( !this.refs.chart ) return

		let { type, data } = config
		let options = config.options || {}
		let responsiveOptions = config.responsiveOptions || []

		if ( this.chartist ) {
			this.chartist.update(data, options, responsiveOptions)
		} else {
			this.chartist = new Chartist[type](this.refs.chart, data, options, responsiveOptions)

			if( config.listener ) {
				for ( let event in config.listener ) {
					if ( config.listener.hasOwnProperty(event) ) {
						this.chartist.on( event, config.listener[event] )
					}
				}
			}

		}
	}

	render() {
		const className = this.props.className ? ' ' + this.props.className : ''
		const style = this.props.style ? this.props.style : {}
		return (<div className={"ct-chart" + className} ref="chart" style={style} />)
	}

}


export default BaseChart