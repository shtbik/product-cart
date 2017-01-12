import React from 'react'
import AdvancedLoader from 'react-loader-advanced'

class Loader extends React.Component {

	render(){
		const message = <div className="sk-spinner sk-spinner-rotating-plane"></div>
		const props = Object.assign({message}, this.props)

		return(<AdvancedLoader {...props}	/>)
	}
}

export default Loader