import { createStore, compose } from 'redux'
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
// import storageMiddleware from './localStorage'
import rootReducer from '../modules'
import DevTools from '../containers/DevTools'

// const loggerMiddleware = createLogger({ level: { prevState: 'info', action: 'info', nextState: 'info', error: 'info' } })

// const userLogger = false
const middleware = compose(
	// userLogger ?
	// 	applyMiddleware(thunkMiddleware, storageMiddleware, loggerMiddleware)
	// 		: applyMiddleware(thunkMiddleware, storageMiddleware)
	DevTools.instrument()
)

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, middleware)
	// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
	if (module.hot) {
		module.hot.accept('../modules', () =>
			store.replaceReducer(
				require('../modules') // eslint-disable-line global-require
				)
		)
	}

	return store
}
