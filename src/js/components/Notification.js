import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function Notification( props ){

	const { kind, message } = props

	return (
		<div className={`alert alert-${kind}`}>
			<div className="notif__icon"></div>
			<div className="notif__content">
				<span className="notif__message"><FormattedMessage id={message} defaultMessage={message} /></span>
			</div>
			<div className="notif__close"></div>
		</div>
	)
}

