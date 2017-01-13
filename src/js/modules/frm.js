import _ from 'lodash'
import axios from 'axios'
import { SubmissionError } from 'redux-form'

import store from '../store'
import { normalizeErrors } from '../selectors/form'
import { hideModal, modalNames } from './modal'
import { fetchOne } from './content'
import { core as coreConfig, createAxiosInstance } from '../configs/core'

import { actions as notifActions } from 'redux-notifications'
const { notifSend, notifClear, notifDismiss } = notifActions


export function sleep ( ms ) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function showFormErrors ( errors, dispatch ) {

	const notificationError = errors._error || 'follow_validation_rules'
	return sleep(0).then(() => {
		dispatch(notifSend({
			message: 'errors.' + notificationError,
			kind: 'danger',
			dismissAfter: coreConfig.notification.errorTime
		}))

		throw new SubmissionError( errors )
	})
}

export function live( req, query, callback ) {

	const defaultOptions = req.options || []
	const defaultResponse = {options: defaultOptions}

	//console.log('defaultResponse', defaultResponse)
	//console.log(req, query)
	if( !query ) return callback(null, defaultResponse)

	const axiosInstance = createAxiosInstance()

	return axiosInstance.get(req.url, {params: {query}}).then(( res ) => {
		//console.log('success', res)
		console.log('options', _.unionBy(res.data.entries, defaultOptions, 'id'))
		return {options: _.unionBy(res.data.entries, defaultOptions, 'id')}

	}).catch(( res ) => {
		console.log('error', res)
		return defaultResponse
	})
}


export function get( req, params ) {
	console.log(req, params)

	const axiosInstance = createAxiosInstance()

	return axiosInstance.get(req.url, {params}).then(( res ) => {
		console.log('success', res)

		if( req.callback ) req.callback(res)
		

	}).catch(( res ) => {
		console.log('error', res)
		
	})
}


export function post( req, data, dispatch ){

	console.log(req, data)

	const axiosInstance = createAxiosInstance()
	if( _.size(req.omit) ) data = _.omit(data, req.omit)

	return axiosInstance.post(req.url, {data}).then(( res ) => {
		console.log('success', res)

		dispatch(notifSend({
			message: 'labels.operation_successful',
			kind: 'success',
			dismissAfter: coreConfig.notification.successTime
		}))

		if( req.callback ) req.callback(res)

	}).catch(( res ) => {
		console.log('error', res)

		const errors = _.get(res, 'data.errors', [])
		const serverError = _.find(errors, '_error')

		if( serverError ) {

			dispatch(notifSend({
				message: 'errors.' + serverError._error,
				kind: 'danger',
				dismissAfter: coreConfig.notification.errorTime
			}))

			throw new SubmissionError( serverError ) 

		} else if( _.size(errors) ) {

			const normalizedErrors = normalizeErrors({errors})
			const error = res.status == 422 ? {_error: 'follow_validation_rules'} : {_error: 'server'}

			dispatch(notifSend({
				message: 'errors.' + error._error,
				kind: 'danger',
				dismissAfter: coreConfig.notification.errorTime
			}))

			throw new SubmissionError( Object.assign({}, normalizedErrors, error) )
		}
		
	})
}


export function patch( req, data, dispatch ){

	console.log(req, data)

	const id = req.id || data.id

	if( !id ) throw new SubmissionError( Object.assign( { _error: 'empty_id' }) )

	const axiosInstance = createAxiosInstance()

	if( _.size(req.omit) ) data = _.omit(data, req.omit)

	return axiosInstance.patch( `${req.url}/${id}`, {data}).then(( res ) => {
		console.log('success', res)
		
		dispatch(notifSend({
			message: 'labels.operation_successful',
			kind: 'success',
			dismissAfter: coreConfig.notification.successTime
		}))

		if( req.callback ) req.callback(res)

	}).catch(( res ) => {
		console.log('error', res)

		const errors = _.get(res, 'data.errors', [])
		const serverError = _.find(errors, '_error')

		if( serverError ) {

			dispatch(notifSend({
				message: 'errors.' + serverError._error,
				kind: 'danger',
				dismissAfter: coreConfig.notification.errorTime
			}))

			throw new SubmissionError( serverError ) 

		} else if( _.size(errors) ) {

			const normalizedErrors = normalizeErrors({errors})
			const error = res.status == 422 ? {_error: 'follow_validation_rules'} : {_error: 'server'}

			dispatch(notifSend({
				message: 'errors.' + error._error,
				kind: 'danger',
				dismissAfter: coreConfig.notification.errorTime
			}))

			throw new SubmissionError( Object.assign({}, normalizedErrors, { _error: 'generic' }) )
		}
		
	})
}