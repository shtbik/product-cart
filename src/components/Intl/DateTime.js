import React from 'react'
import moment from 'moment'
import { FormattedDate, FormattedTime } from 'react-intl'


export default function DateTime( props ){
	const date = moment(props.date).toDate()
	return (
		<span><FormattedDate value={date} /> <FormattedTime value={date} /></span>
	)
}