import _ from 'lodash'
// import { createSelectorCreator, defaultMemoize } from 'reselect'
// import isEqual from 'shallowequal'

import store from '../store'

// const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual)

// const availableActions = createDeepEqualSelector(
// 	( props ) => props.roles,
// 	( props ) => props.function_aliases,
// 	( roles, function_aliases ) => {
// 		if ( _.size(roles) ) {
// 			const functions = _.map(roles || [], role => role.functions)
// 			const access = _.map(_.unionBy(...functions, 'alias'), role => role.alias).sort()
// 			return access
// 		}
// 		return function_aliases
// 	}
// )

// const isAdmin = createDeepEqualSelector(
// 	( props ) => props.roles,
// 	( roles ) => {
// 		const ids = _.map(roles || [], role => role.id) || []
// 		return ids.indexOf(1) !== -1
// 	}
// )


// Используется в роутах, как проверка юзера на логин
const auth = {
	loggedIn() {
		const state = store.getState()
		return !!_.get(state, 'auth.api_token')
	},

	requireAuth( nextState, replace ) {
		// console.log(auth.loggedIn());
		if (!auth.loggedIn()) {
			replace({
				pathname: '/auth',
				state: { nextPathname: nextState.location.pathname }
			})
		}
	}
}

export default auth
export { auth }
// export { availableActions, isAdmin, auth }
