import _ from 'lodash'

const getBaseUrl = function() {
	const { protocol, host } = _.get(window, 'location', { protocol: '', location: '', port: '' })
	if (window && host.indexOf('herokuapp') !== -1) {
		return `${protocol}//safe-atoll-35554.herokuapp.com/api/`
	}
	return `${protocol}//localhost:5000/api/`
}

const axiosDefaults = {
	baseURL: getBaseUrl(),
	timeout: 60000,
	withCredentials: false
}

const core = {
	locale: 'ru',
	localStorage: {
		name: 'cart'
	}
}

export default core
export { core, axiosDefaults }
