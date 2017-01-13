import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'


const InfoBox = injectIntl( ( props, context ) => {

	const badges = props.badges || []
	const intl = props.intl

	return (
		<div className="ibox">
			<div className="ibox-title">
				{badges.map( (badge, key) => 
					(<span key="key" className={`label label-${badge.type || 'success'} pull-right`}>
						{intl.formatMessage({id: badge.title})}
					</span>)
				)}
				
				<h5><FormattedMessage id={props.title} /></h5>
			</div>
			<div className="ibox-content">{props.children}</div>
		</div>
	)
})

export default InfoBox