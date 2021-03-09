/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import IdentityModal from 'react-netlify-identity-widget'

import '@reach/tabs/styles.css'
import 'react-netlify-identity-widget/styles.css'

import Header from './header'

interface Props {
  children: any
}

const Layout = ({ children }: Props) => {
  const [dialog, setDialog] = useState(false)

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
        setDialog={setDialog}
      />
      <div className="box-border max-w-screen-lg px-4 py-8 mx-auto">
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
