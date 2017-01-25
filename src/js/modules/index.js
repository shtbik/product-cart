import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// import content from './content'
import auth from './auth'
import tests from './tests'
import employees from './employees'

export default combineReducers({
	form: formReducer,
	routing: routerReducer,
	auth,
	tests,
	employees
})
