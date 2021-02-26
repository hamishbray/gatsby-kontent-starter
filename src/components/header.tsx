import React from 'react'
import { Link } from 'gatsby'
import { ReactNetlifyIdentityAPI } from 'react-netlify-identity'

interface Props {
  siteTitle: string
  identity: ReactNetlifyIdentityAPI
  setDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ siteTitle, identity, setDialog }: Props) => {
  const name = identity?.user?.user_metadata?.full_name ?? 'NoName'
  const isLoggedIn = identity?.isLoggedIn
  return (
    <header className="mb-6 bg-yellow-900">
      <div className="flex max-w-screen-lg px-4 py-8 mx-auto">
        <div className="inline text-4xl">
          <Link to="/" className="text-white no-underline">
            {siteTitle}
          </Link>
        </div>
        <nav className="inline pl-8 text-white">
          <button
            className="inline px-4 py-2 border-2 border-white rounded hover:border-black hover:text-black"
            onClick={() => setDialog(true)}
          >
            {isLoggedIn ? `Hello ${name}, Log out here!` : 'LOG IN'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
