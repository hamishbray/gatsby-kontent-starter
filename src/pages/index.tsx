import React from 'react'
import { Link } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-widget'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage: React.FC = () => {
  const { isLoggedIn } = useIdentityContext()
	
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Welcome!</h1>
      <Link to="/accessories/">Accessories</Link> |{' '}
      <Link to="/articles/">Articles</Link> | <Link to="/cafes/">Cafes</Link>
      {isLoggedIn && (
        <>
          {' '}
          | <Link to="/account/profile">My Account</Link>
        </>
      )}
    </Layout>
  )
}

export default IndexPage
