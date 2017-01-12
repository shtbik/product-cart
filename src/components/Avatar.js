import React from 'react'

class Avatar extends React.Component {

	state = {
		error: false
	};

	static defaultProps = {
		defaultAvatar: '/img/default-avatar.jpg'
	};


	handleError( ){
		this.setState({error: true})
		this.refs.img.src = this.props.defaultAvatar
	}

	render(){
		return <img ref="img" onError={this.handleError.bind(this)} {...this.props} />
	}
}

export default Avatar