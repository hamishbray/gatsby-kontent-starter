import React from 'react'
import { Router } from '@reach/router'

import Layout from '../../components/layout'
import PrivateRoute from '../../components/privateRoute'
import Login from './login'
import Profile from './profile'

const Account: React.FC = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/account/profile" component={Profile} />
      <Login path="/account/login" />
    </Router>
  </Layout>
)

export default Account
