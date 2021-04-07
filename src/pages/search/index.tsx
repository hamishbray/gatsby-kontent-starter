import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from '@reach/router'
import {
	Configure,
	InstantSearch,
	SearchBox,
	Hits,
	Pagination,
	RefinementList,
} from 'react-instantsearch-dom'

import 'instantsearch.css/themes/satellite.css' //'instantsearch.css/themes/reset.css'
import './search.css'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Hit from '../../components/hit'
import {
	DEBOUNCE_TIME,
	INDEX_NAME as indexName,
	isClient,
	createURL,
	getSearchClient,
	SearchState,
	searchStateFromUrl,
	searchStateToUrl,
} from '../../utils/search'

const SearchPage: React.FC = () => {
	const location = useLocation()
	const [searchState, setSearchState] = useState(
		isClient ? searchStateFromUrl(location) : undefined
	)
	const setStateId = useRef<NodeJS.Timeout>()

	useEffect(() => {
		const nextSearchState = searchStateFromUrl(location)

		if (JSON.stringify(searchState) !== JSON.stringify(nextSearchState))
			setSearchState(nextSearchState)
	}, [location])

	const onSearchStateChange = (updatedSearchState: SearchState) => {
		setStateId.current && clearTimeout(setStateId.current)

		setStateId.current = setTimeout(() => {
			history.pushState(
				updatedSearchState,
				'',
				searchStateToUrl(updatedSearchState)
			)
		}, DEBOUNCE_TIME)

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
				<Configure hitsPerPage={6} />
				<SearchBox />
				<div className="flex flex-wrap md:flex-nowrap">
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
