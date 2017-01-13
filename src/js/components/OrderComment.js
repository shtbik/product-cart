import React from 'react'
//import { injectIntl } from 'react-intl'
import IntlDateTime from './Intl/DateTime'

const comment = ( props ) => {

	return (
		<div className="comment">
			<div className="comment-text">{props.text}</div>
			<div className="comment-meta">
				<div className="comment-author">
					{props.created_by_user.last_name} {props.created_by_user.first_name},
				</div>
				<div className="comment-company">
					{props.created_by_user.partner.name},
				</div>
				<div className="comment-date"><IntlDateTime date={props.created_at} /></div>
			</div>
		</div>
	)
}

export default comment
//export default injectIntl(comment)