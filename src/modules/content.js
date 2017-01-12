import _ from 'lodash'
import axios from 'axios'
import { SubmissionError } from 'redux-form'

import store from '../store'
import { core as coreConfig, createAxiosInstance } from '../configs/core'

////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////////

export const RECEIVE_CONTENT = 'pp.admin/content/RECEIVE_CONTENT'
export const APPEND_CONTENT = 'pp.admin/content/APPEND_CONTENT'
export const REFRESH_CONTENT = 'pp.admin/content/REFRESH_CONTENT'
export const REFRESH_ONE = 'pp.admin/content/REFRESH_ONE'
export const RECEIVE_FEEDBACK = 'pp.admin/content/RECEIVE_FEEDBACK'
export const REQUEST_CONTENT = 'pp.admin/content/REQUEST_CONTENT'
export const POST_CONTENT = 'pp.admin/content/POST_CONTENT'
export const PATCH_CONTENT = 'pp.admin/content/PATCH_CONTENT'
export const CLEAR_CONTENT = 'pp.admin/content/CLEAR_CONTENT'
export const DELETE_CONTENT = 'pp.admin/content/DELETE_CONTENT'
export const MODIFY_BY_INDEX = 'pp.admin/content/MODIFY_BY_INDEX'
export const MARK_AS_SELECTED = 'pp.admin/content/MODIFY_BY_INDEX'

export const REQUEST_DELETE_CONTENT = 'pp.admin/content/REQUEST_DELETE_CONTENT'
export const CONFIRM_DELETE_CONTENT = 'pp.admin/content/CONFIRM_DELETE_CONTENT'
export const DENY_DELETE_CONTENT = 'pp.admin/content/DENY_DELETE_CONTENT'

export const REQUEST_POST_CONTENT = 'pp.admin/content/REQUEST_POST_CONTENT'
export const CONFIRM_POST_CONTENT = 'pp.admin/content/CONFIRM_POST_CONTENT'
export const DENY_POST_CONTENT = 'pp.admin/content/DENY_POST_CONTENT'


////////////////////////////////////////////////////////////////////////////////////
// ACTIONS
////////////////////////////////////////////////////////////////////////////////////


//// -------SYNC------- //// 

export const receiveContent = ( data ) => ({type: RECEIVE_CONTENT, data, key: _.keys(data).pop(), receivedAt: Date.now()})
export const appendContent = ( data ) => ({type: APPEND_CONTENT, data, key: _.keys(data).pop(), receivedAt: Date.now()})
export const refreshContent = ( data ) => ({type: REFRESH_CONTENT, data, key: _.keys(data).pop(), receivedAt: Date.now()})
export const refreshOne = ( data ) => ({type: REFRESH_ONE, data, key: _.keys(data).pop(), receivedAt: Date.now()})
export const receiveFeedback = ( data ) => ({type: RECEIVE_FEEDBACK, data, key: _.keys(data).pop(), receivedAt: Date.now()})
export const requestContent = ( params ) => ({type: REQUEST_CONTENT, params})	
export const postContent = ( params ) => ({type: POST_CONTENT, params})
export const patchContent = ( params ) => ({type: PATCH_CONTENT, params})
export const modifyByIndex = ( params ) => ({type: MODIFY_BY_INDEX, ...params})
export const markAsSelected = ( params ) => ({type: MARK_AS_SELECTED, ...params})




export const requestPost = ( params ) => ({type: REQUEST_POST_CONTENT, params})
export const confirmPost = ( params ) => ({type: CONFIRM_POST_CONTENT, params})
export const denyPost = ( params ) => ({type: DENY_POST_CONTENT, params})

export const requestDelete = ( params ) => ({type: REQUEST_DELETE_CONTENT, params})
export const confirmDelete = ( params ) => ({type: CONFIRM_DELETE_CONTENT, params})
export const denyDelete = ( params ) => ({type: DENY_DELETE_CONTENT, params})

export const clearContent = ( params ) => ({type: CLEAR_CONTENT, params})


//// -------ASYNC------- ////

/// _DELETE

export const deleteOne = ( req ) => {
	const axiosInstance = createAxiosInstance()

	return  ( dispatch ) => {
		
		dispatch(requestDelete(req))
		axiosInstance.delete(req.url, req.data).then(( res ) => {
			
			console.log(res)
			dispatch(confirmDelete(res))
			if( req.callback ) req.callback(res)

		}).catch(( res ) => {

			console.log(res)
			dispatch(denyDelete(res))
			
		})

	}
}

/// _POST

export function submit( req ){
	const axiosInstance = createAxiosInstance()

	return axiosInstance.post(req.url, req.data).then(( res ) => {
		console.log(res)
	}).catch(( res ) => {
		console.log(res)
		throw new SubmissionError({ _error: `Status ${res.status}: ${res.statusText}` })
	})
}

export function postTest( req ) {
	const axiosInstance = createAxiosInstance()

	return axiosInstance.post(req.url, req.data)
}

export function post( reqs ) {
	return dispatch => {		
		_.each(reqs, req => {
			postOne(dispatch, req)
		})
	}
}

// export function postOneOld( dispatch, req ) {
// 	const axiosInstance = createAxiosInstance()

// 	console.log(req)
// 	dispatch(postContent(req))
// 	axiosInstance.post(req.url, req.data).then(res => {
// 		dispatch(receiveFeedback({[req.key]: res.data}))
// 		if( req.callback ) req.callback()
// 	}).catch(res => {
// 		throw `Could not postOne ${req.url} (${res})`
// 	})
// }

export const postOne = ( req ) => {
	const axiosInstance = createAxiosInstance()

	return  ( dispatch ) => {
		
		dispatch(requestPost(req))
		axiosInstance.post(req.url, req.data).then(( res ) => {

			console.log(res)
			dispatch(confirmPost(res))
			if( req.callback ) req.callback( res )

		}).catch(( res ) => {

			console.log(res)
			dispatch(denyPost(res))

		})

	}
}

/// _PATCH

export function patch( reqs ) {
	return dispatch => {		
		_.each(reqs, req => {
			patchOne(dispatch, req)
		})
	}
}


export const patchOne = ( req ) => {
	const axiosInstance = createAxiosInstance()

	return  ( dispatch ) => {
		
		dispatch(requestPost(req))
		axiosInstance.patch(req.url, req.data).then(( res ) => {

			console.log(res)
			dispatch(confirmPost(res))
			if( req.callback ) req.callback( res )

		}).catch(( res ) => {

			console.log(res)
			dispatch(denyPost(res))

		})

	}
}




/// _GET ///

export function fetchCascade( params ) {

	const axiosInstance = createAxiosInstance()

	return dispatch => {

		dispatch(requestContent(params))

		//fetch main entity so that we get a numeric id
		axiosInstance.get(params.url).then( function( res ) {
			dispatch(receiveContent({[params.key]: res.data}))
			return res.data || {}

		//now fetch the rest of the data using numeric id	
		}).then(function( res ){

			_.each(params.reqs, req => {
				
				const id = _.get(res, req.fk || 'id')
				const url = req.url + id

				fetch( dispatch, {url, key: req.key} )
			})

		}).catch(res => {
			throw `Could not fetchCascade ${req.url} (${res})`
		})
	}
}

export function fetchOne( req ) {
	return dispatch => fetch(dispatch, req)
}

export function fetchConcurrent( reqs ) {

	return dispatch => {		
		_.each(reqs, req => {
			fetch(dispatch, req)
		})
	}
}

export function fetchMore( req ) {

	return dispatch => {		
		const axiosInstance = createAxiosInstance()

		const params = {params: req.params} || {}

		dispatch(requestContent(req))
		axiosInstance.get(req.url, params).then(res => {
			dispatch(appendContent({[req.key]: res.data}))
		}).catch(res => {
			throw `Could not fetch ${req.url} (${res})`
		})
	}
}

export function fetchAgain( req ) {

	return dispatch => {		
		const axiosInstance = createAxiosInstance()

		const params = {params: req.params} || {}

		dispatch(requestContent(req))
		axiosInstance.get(req.url, params).then(res => {
			dispatch(refreshContent({[req.key]: res.data}))
		}).catch(res => {
			throw `Could not fetch ${req.url} (${res})`
		})
	}
}

export function refetchOne( req ) {

	return dispatch => {		
		const axiosInstance = createAxiosInstance()

		const params = {params: req.params} || {}

		dispatch(requestContent(req))
		axiosInstance.get(req.url, params).then(res => {
			dispatch(refreshOne({[req.key]: res.data}))
		}).catch(res => {
			throw `Could not fetch ${req.url} (${res})`
		})
	}
}

export function fetch( dispatch, req ) {
	const axiosInstance = createAxiosInstance()

	const params = {params: req.params} || {}

	dispatch(requestContent(req))
	axiosInstance.get(req.url, params).then(res => {
		dispatch(receiveContent({[req.key]: res.data}))
		if( req.callback ) req.callback(res)
	}).catch(res => {
		dispatch(receiveContent({[req.key]: null}))
		if( req.errorCallback ) req.errorCallback(res)
		throw `Could not fetch ${req.url} (${res})`
	})
}


////////////////////////////////////////////////////////////////////////////////////
// REDUCER
////////////////////////////////////////////////////////////////////////////////////

const initialState = { loaders: {} }


export default function reducer(state = initialState, action) {

	let loaders = Object.assign({}, state.loaders)

	switch (action.type) {
		case RECEIVE_CONTENT:
			_.set(loaders, action.key, false)
			return Object.assign({}, state, action.data, {loaders})

		case MARK_AS_SELECTED: 

			var stateEntries = _.get(state, `${action.key}.entries`, []).slice()

			var entries = stateEntries.map( ( stateEntry, index ) => {
				if( index == action.index ) stateEntry.selected = true
				else stateEntry.selected = false

				return stateEntry	
			})

			return _.merge({}, state, {[`${action.key}`]: {entries}})	

		case MODIFY_BY_INDEX: 
			var entries = _.get(state, `${action.key}.entries`, []).slice()
			var entry = action.data || {}

			if( entries[action.index] ) entries[action.index] = entry

			return _.merge({}, state, {[`${action.key}`]: {entries}})

		case REFRESH_ONE: 

			_.set(loaders, action.key, false)

			const stateEntries = _.get(state, `${action.key}.entries`, [])
			const actionEntry = _.get(action.data, `${action.key}.entries[0]`, {})

			const entries = _.reduce(stateEntries, (res, entry, key) => {
				res[key] = entry.id == actionEntry.id ? actionEntry : entry
				return res
			}, [])

			return _.merge({}, state, {[`${action.key}`]: {entries}}, {loaders})	

		case REFRESH_CONTENT:
			_.set(loaders, action.key, false)

			var stateEntries = _.get(state, `${action.key}.entries`, [])
			var actionEntries = _.get(action.data, `${action.key}.entries`, [])
			var entries = _.unionBy(actionEntries, stateEntries, 'id')

			var data = Object.assign({}, action.data)
			data[action.key].entries = entries
			return Object.assign({}, state, data, {loaders})	
	

		case APPEND_CONTENT:
			_.set(loaders, action.key, false)

			var stateEntries = _.get(state, `${action.key}.entries`, [])
			var actionEntries = _.get(action.data, `${action.key}.entries`, [])
			var entries = _.unionBy(stateEntries, actionEntries, 'id')

			var data = Object.assign({}, action.data)
			data[action.key].entries = entries
			return Object.assign({}, state, data, {loaders})	

		case REQUEST_CONTENT:
			_.set(loaders, action.params.key, true)
			return Object.assign({}, state, {loaders} )
		case POST_CONTENT:
			return Object.assign({}, state, {loaders} )	
		
		case CLEAR_CONTENT:
			var nextState = _.omit( Object.assign({}, state), action.params )
			//loaders = _.omit( loaders, action.params.key )
			loaders = _.omit( loaders, action.params )
			return Object.assign({}, nextState, {loaders} )	
				
		default:
			return state
	}
	
}