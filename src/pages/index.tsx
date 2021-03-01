import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { isLoggedIn } from '../services/auth'

const IndexPage: React.FC = () => (
	<Layout>
		<SEO title="Home" />
		<h1>Welcome!</h1>
		<Link to="/accessories/">Accessories</Link> |{' '}
		<Link to="/articles/">Articles</Link> | <Link to="/cafes/">Cafes</Link>
		{isLoggedIn() && (
			<>
				{' '}
				| <Link to="/account/profile">My Account</Link>
			</>
		)}
	</Layout>
)

export default IndexPage
