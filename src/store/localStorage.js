import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

import coreConfig from '../configs/core'
import { AUTH_LOGIN_RECEIVE } from '../modules/auth'

const storageEngine = createEngine(coreConfig.localStorage.name)
const storageMiddleware = storage.createMiddleware(storageEngine, [], [AUTH_LOGIN_RECEIVE])

export default storageMiddleware