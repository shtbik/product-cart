import storage from 'redux-persist/lib/storage'

export default {
	key: 'app',
	storage,
	whitelist: ['cart', 'products'],
}
