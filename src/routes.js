import React from 'react'
import { Route } from 'react-router'

/* Route handlers/layouts */
import App from './components/layouts/app'
import Landing from './components/layouts/landing'
import Home from './components/common/home'
import Login from './containers/login'
import Register from './containers/register'

import { checkLogged, getSession } from './modules/auth'

export default (
  <Route>
    <Route component={App}>
    </Route>
  </Route>
)
