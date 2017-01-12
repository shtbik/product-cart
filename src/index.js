// import './styles/scss/style.scss'
// import 'react-virtualized/styles.css'

// import 'chartist/dist/scss/chartist.scss'
// import 'react-datepicker/dist/react-datepicker.css'
// import 'react-day-picker/lib/style.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import Root from './containers/Root'
// import DevTools from './containers/DevTools'

const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
