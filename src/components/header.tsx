import { Link } from 'gatsby'
import React from 'react'

interface Props {
  siteTitle?: string
}

const Header = ({ siteTitle }: Props) => (
  <header className="mb-6 bg-yellow-900">
    <div className="max-w-screen-lg px-4 py-8 mx-auto">
      <div className="text-4xl">
        <Link to="/" className="text-white no-underline">
          {siteTitle}
        </Link>
      </div>
    </div>
  </header>
)

export default Header
