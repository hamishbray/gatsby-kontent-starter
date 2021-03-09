import React from 'react'
import { navigate } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-widget'

type Props = {
  component: React.FC<any>
  location: Location
}

const PrivateRoute: React.FC<any> = ({
  component: Component,
  location,
  ...rest
}: Props): JSX.Element | null => {
  const { isLoggedIn } = useIdentityContext()

  if (!isLoggedIn && location.pathname !== `/account/login`) {
    navigate('/account/login')
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
