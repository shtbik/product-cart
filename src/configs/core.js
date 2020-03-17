const getBaseUrl = () => {
	return `https://reqres.in/api/users`
}

const axiosDefaults = {
	baseURL: getBaseUrl(),
	timeout: 60000,
	withCredentials: false,
}

const core = {
	locale: 'ru',
	localStorage: {
		name: 'cart',
	},
}

export default core
export { core, axiosDefaults }
