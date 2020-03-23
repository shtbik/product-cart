import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'

import DevTools from 'components/DevTools'
import rootReducer from 'modules'
import persistConfig from 'configs/persistConfig'

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = compose(
	applyMiddleware(thunkMiddleware),
	DevTools.instrument()
)

export default () => {
	const store = createStore(persistedReducer, middleware)
	const persistor = persistStore(store)
	return { store, persistor }
}
