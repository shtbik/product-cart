import React from 'react'
import ReactDOM from 'react-dom'

import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import Root from './containers/Root'
import '../scss/index.scss';
// import DevTools from './containers/DevTools'

const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
