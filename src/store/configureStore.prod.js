import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from 'modules'
import persistConfig from 'configs/persistConfig'

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = compose(applyMiddleware(thunkMiddleware))

export default () => {
	const store = createStore(persistedReducer, middleware)
	const persistor = persistStore(store)
	return { store, persistor }
}
