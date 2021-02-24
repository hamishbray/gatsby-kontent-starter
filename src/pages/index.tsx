import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
		<h1>Welcome!</h1>
    <Link to="/accessories/">Accessories</Link> |{' '}
    <Link to="/articles/">Articles</Link> |{' '}
		<Link to="/cafes/">Cafes</Link>
  </Layout>
)

export default IndexPage
