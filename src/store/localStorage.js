import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

import { ADD_PRODUCT_TO_CART, CHANGE_CART_COUNT, DELETE_CART_ITEM } from 'modules/cart'
import coreConfig from 'configs/core'

const storageEngine = createEngine(coreConfig.localStorage.name)
const storageMiddleware = storage.createMiddleware(
	storageEngine,
	[],
	[ADD_PRODUCT_TO_CART, CHANGE_CART_COUNT, DELETE_CART_ITEM]
)

export default storageMiddleware
