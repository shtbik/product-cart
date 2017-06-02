import _ from 'lodash'

const getBaseUrl = function() {
	const { protocol, host } = _.get(window, 'location', { protocol: '', location: '', port: '' })
	if (window && host.indexOf('shtykov') !== -1) {
		return `${protocol}//node.shtykov.com/api/`
	}
	return `${protocol}//localhost:3000/api/`
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
