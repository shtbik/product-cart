import _ from 'lodash'

const getBaseUrl = function() {
	const { protocol, host } = _.get(window, 'location', { protocol: '', location: '', port: '' })
	// const { protocol, host }
	if (window && host.indexOf('shtykov.com') !== -1) {
		return `${protocol}//shtykov.com/`
	}
	return `https://shtbik.github.io/`
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
