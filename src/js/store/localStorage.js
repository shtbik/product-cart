import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

import coreConfig from '../configs/core'
import { ADD_CART_RECEIVE, CHANGE_CART_COUNT_RECEIVE, DELETE_CART_ITEM_RECEIVE } from '../modules/cart'

const storageEngine = createEngine(coreConfig.localStorage.name)
const storageMiddleware = storage.createMiddleware(storageEngine, [], [ADD_CART_RECEIVE, CHANGE_CART_COUNT_RECEIVE, DELETE_CART_ITEM_RECEIVE])

export default storageMiddleware
