import React, { useState } from 'react'
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  RefinementList,
} from 'react-instantsearch-dom'
import { HistoryLocation } from '@reach/router'

import 'instantsearch.css/themes/satellite.css' //'instantsearch.css/themes/reset.css'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Hit from '../../components/hit'
import {
	DEBOUNCE_TIME,
	INDEX_NAME as indexName,
	isClient,
  createURL,
  getSearchClient,
  searchStateFromUrl,
  searchStateToUrl,
} from '../../utils/search'

type Props = {
	location: HistoryLocation,
}

const SearchPage: React.FC<Props> = ({ location }: Props) => {
  const [searchState, setSearchState] = useState(
    isClient ? searchStateFromUrl(location) : undefined
  )
  const [debouncedState, setDebouncedState] = useState()

  const onSearchStateChange = (updatedSearchState: any) => {
    debouncedState && clearTimeout(debouncedState)

    setDebouncedState(
      //@ts-ignore
      setTimeout(() => {
        history.pushState(
          updatedSearchState,
          '',
          searchStateToUrl(updatedSearchState)
        )
      }, DEBOUNCE_TIME)
    )

    setSearchState(updatedSearchState)
  }

  return (
    <Layout>
      <SEO title="Search" />
      <InstantSearch
        {...{
          indexName,
          searchClient: getSearchClient(),
          searchState,
          onSearchStateChange,
          createURL,
        }}
      >
        <Configure hitsPerPage={4} />
        <SearchBox />
        <div className="flex">
          <div className="pr-8 mt-8">
            <h3>Refine</h3>
            <RefinementList attribute="type" />
          </div>
          <div className="flex-grow">
            <div className="mt-8">
              <Hits hitComponent={Hit} />
            </div>
            <div className="mt-8">
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </Layout>
  )
}

export default SearchPage
