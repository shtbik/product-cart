import axios from 'axios'
import _ from 'lodash'
import store from '../store'

const getBaseUrl = function() {
	const { protocol, host } = _.get(window, 'location', { protocol: '', location: '', port: '' })
	if (window && host.indexOf('doalloc.dasreda.ru') !== -1) {
		return `${protocol}//localhost:3000/api/`
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
	},

	// notification: {
	// 	errorTime: 5000,
	// 	successTime: 3000
	// },

	// api: {
	// 	axiosDefaults,

	// 	axiosConfig(params) {
	// 		const headers = {
	// 			Authorization: `Token token=${params.api_token}`,
	// 			Source: 'ui'
	// 		}
	// 		return Object.assign({}, axiosDefaults, { headers })
	// 	}
	// }
}

const createAxiosInstance = () => {
	getBaseUrl()
	const state = store.getState()
	const api_token = _.get(state, 'auth.api_token')
	const axiosConfig = core.api.axiosConfig({ api_token })

	return axios.create(axiosConfig)
}

export default core
export { core, axiosDefaults, createAxiosInstance }
