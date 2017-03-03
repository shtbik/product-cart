import _ from 'lodash'

const getBaseUrl = function() {
	const { protocol } = _.get(window, 'location', { protocol: '', location: '', port: '' })
	// const { protocol, host }
	// if (window && host.indexOf('test.ru') !== -1) {
	// 	return `${protocol}//localhost:3000/api/`
	// }
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
