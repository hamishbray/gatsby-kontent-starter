/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import IdentityModal, {
  useIdentityContext,
} from 'react-netlify-identity-widget'
import 'react-netlify-identity-widget/styles.css'

import Header from './header'

interface Props {
  children: any
}

const Layout = ({ children }: Props) => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = useState(false)
  const name = identity?.user?.user_metadata?.name ?? 'NoName'

  console.log(JSON.stringify(identity))
  const isLoggedIn = identity?.isLoggedIn

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      kontentItemHome {
        elements {
          metadata__meta_title {
            value
          }
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={
          data.kontentItemHome.elements.metadata__meta_title.value || `Title`
        }
      />
      <div className="box-border max-w-screen-lg px-4 py-8 mx-auto">
        <nav style={{ background: 'green' }}>
          {' '}
          Login Status:
          <button className="btn" onClick={() => setDialog(true)}>
            {isLoggedIn ? `Hello ${name}, Log out here!` : 'LOG IN'}
          </button>
        </nav>
        <main>{children}</main>
        <footer className="mt-8">© {new Date().getFullYear()}</footer>
      </div>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
      />
    </>
  )
}

export default Layout
