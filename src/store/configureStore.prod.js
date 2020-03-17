import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import storageMiddleware from './localStorage'
import rootReducer from '../modules'

const middleware = applyMiddleware(thunkMiddleware, storageMiddleware)

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, middleware)
}
