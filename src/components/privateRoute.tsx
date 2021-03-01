import React from 'react'
import { navigate } from 'gatsby'

import { isLoggedIn } from '../services/auth'

type Props = {
  component: React.FC<any>
  location: Location
}

const PrivateRoute: React.FC<any> = ({
  component: Component,
  location,
  ...rest
}: Props): JSX.Element | null => {
  if (!isLoggedIn() && location.pathname !== `/account/login`) {
    navigate('/account/login')
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
