import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from '../containers/App'
import Home from '../containers/Home'
import Profile from '../containers/Profile'
import Mark from '../containers/Mark'
import Tests from '../containers/Tests'
import Employees from '../containers/Employees'
// import Users from '../containers/Users'
// import Brokers from '../containers/Brokers'
// import Partners from '../containers/Partners'

// import UserPage from '../containers/UserPage'
// import PartnerPage from '../containers/PartnerPage'
// import ProductPage from '../containers/ProductPage'
// import OrderStatusPage from '../containers/OrderStatusPage'
// import ChannelPage from '../containers/ChannelPage'
// import MerchantPage from '../containers/MerchantPage'
// import MerchantBranchPage from '../containers/MerchantBranchPage'
// import MerchantBranchGroupPage from '../containers/MerchantBranchGroupPage'
// import OrderPage from '../containers/OrderPage'
// import ArchivePage from '../containers/ArchivePage'

// import Banks from '../containers/Banks'
// import FormProfile from '../containers/Form/Profile'
// import ProductProfile from '../containers/ProductProfile'
// import ProductBuilder from '../containers/ProductBuilder'

// import LocaleEditor from '../containers/LocaleEditor'
// import ValidationEditor from '../containers/ValidationEditor'
// import FieldsEditor from '../containers/FieldsEditor'

// import Grid from '../containers/Grid'
// import Form from '../containers/Form/Page'

// import SearchResults from '../containers/SearchResults'
import NoMatch from '../components/NoMatch'

import Auth from '../containers/Auth'
import AuthLogin from '../containers/AuthLogin'
import AuthRegistration from '../containers/AuthRegistration'
// import Docs from '../containers/Docs'
// import Test from '../containers/Test'
// import TestIframe from '../containers/TestIframe'
import {auth as authFunc} from '../selectors/auth'

// <Route path="/" component={App} onEnter={auth.requireAuth}>
const AppRoutes = (
	<Route path="/" component={App} onEnter={authFunc.requireAuth}>
		<IndexRoute component={Home}/>
		<Route path="profile" component={Profile}/>
		<Route path="mark" component={Mark}/>
		<Route path="mark/:id" component={Tests}/>
		<Route path="employees" component={Employees}/>
		{ /* <Route path="user" component={UserPage}/>
		<Route path="partner" component={PartnerPage}/>
		<Route path="product" component={ProductPage}/>
		<Route path="order_status" component={OrderStatusPage}/>
		<Route path="channel" component={ChannelPage}/>
		<Route path="merchant" component={MerchantPage}/>
		<Route path="merchant_branch" component={MerchantBranchPage}/>
		<Route path="merchant_branch_group" component={MerchantBranchGroupPage}/>
		<Route path="order" component={OrderPage}/>
		<Route path="product_profile(/:id)" component={ProductProfile}/>
		<Route path="product_profile(/:id)/form" component={FormProfile}/>
		<Route path="archive(/:id)" component={ArchivePage}/>

		<Route path="brokers" component={Brokers}/>

		<Route path="partners" component={Partners}/>
		<Route path="users" component={Users}/>
		<Route path="grid(/:section(/:page))" component={Grid}/>
		<Route path="form(/:section)" component={Form}/>
		<Route path="banks" component={Banks}/>

		<Route path="pb" component={ProductBuilder}/>

		<Route path="/settings/fields/editor" component={FieldsEditor}/>
		<Route path="/settings/locale/editor" component={LocaleEditor}/>
		<Route path="/settings/validation/editor" component={ValidationEditor}/>

		<Route path="docs(/:param)" component={Docs}/>
		<Route path="search(/:query)" component={SearchResults}/>
		<Route path="test(/:param)" component={Test}/>
		<Route path="testiframe(:/param)" component={TestIframe}/> */ }
	</Route>
)

const AuthRoutes = (
	<Route path="/auth" component={Auth}>
		<IndexRoute component={AuthLogin}/>
		<Route path="/auth/login" component={AuthLogin}/>
		<Route path="/auth/reg" component={AuthRegistration}/>
	</Route>
)
const NoMatchRoute = (<Route path="*" component={NoMatch}/>)

export { AppRoutes, AuthRoutes, NoMatchRoute }
