/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'

interface Props {
  children: any
}

const Layout = ({ children }: Props) => {
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
        <main>{children}</main>
        <footer className="mt-8">
          © {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}

export default Layout
