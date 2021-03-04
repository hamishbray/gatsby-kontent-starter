import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
	RefinementList
} from 'react-instantsearch-dom'

import 'instantsearch.css/themes/satellite.css' //'instantsearch.css/themes/reset.css'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Hit from '../../components/hit'

const appId = process.env.ALGOLIA_APP_ID as string
const apiKey = process.env.ALGOLIA_API_KEY as string
const indexName = process.env.ALGOLIA_INDEX_NAME as string
const searchClient = algoliasearch(appId, apiKey)

const SearchPage: React.FC = () => (
  <Layout>
    <SEO title="Search" />
    <InstantSearch {...{ indexName, searchClient }}>
      <Configure hitsPerPage={4} />
      <SearchBox />
			<div className="flex">
				<div className="pr-8 mt-8">
					<h3>Refine</h3>
					<RefinementList attribute="type" />
				</div>
				<div className="flex-grow">
					<div className="mt-8"><Hits hitComponent={Hit} /></div>
					<div className="mt-8"><Pagination /></div>
				</div>
			</div>
    </InstantSearch>
  </Layout>
)

export default SearchPage
