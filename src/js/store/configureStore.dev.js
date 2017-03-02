import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import storageMiddleware from './localStorage'
import rootReducer from '../modules'
import DevTools from '../containers/DevTools'

const middleware = compose(
	applyMiddleware(thunkMiddleware, storageMiddleware),
	DevTools.instrument()
)

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, middleware)
	if (module.hot) {
		module.hot.accept('../modules', () =>
			store.replaceReducer(
				require('../modules')
			)
		)
	}

	return store
}
