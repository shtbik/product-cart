import React, { PropTypes } from 'react'
import cn from 'classnames'

const SortDirection = {ASC: 'ASC', DESC: 'DESC'}

export default function SortIndicator ({ order }) {

  const classNames = cn('ReactVirtualized__Table__sortableHeaderIcon', {
    'ReactVirtualized__Table__sortableHeaderIcon--ASC': order === SortDirection.ASC,
    'ReactVirtualized__Table__sortableHeaderIcon--DESC': order === SortDirection.DESC
  })

  return (
    <svg className={classNames} width={18} height={18} viewBox="0 0 24 24">
      {order === SortDirection.ASC ? <path d="M7 14l5-5 5 5z" /> : <path d="M7 10l5 5 5-5z" />}
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  )
}

SortIndicator.propTypes = {
  SortDirection: PropTypes.oneOf([SortDirection.ASC, SortDirection.DESC])
}

export { SortIndicator, SortDirection }