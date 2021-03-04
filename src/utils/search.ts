import algoliasearch, { SearchClient } from 'algoliasearch/lite'
import qs from 'qs'
import { HistoryLocation } from '@reach/router'

export const DEBOUNCE_TIME = 1000
export const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME as string

export const getSearchClient = (): SearchClient => {
  const appId = process.env.ALGOLIA_APP_ID as string
  const apiKey = process.env.ALGOLIA_API_KEY as string
  return algoliasearch(appId, apiKey)
}

export const createURL = (state: any) => `?${qs.stringify(state)}`

export const searchStateFromUrl = (
  location: HistoryLocation
): { [key: string]: unknown } => qs.parse(location.search.slice(1))

export const searchStateToUrl = (searchState: any) =>
  searchState ? `${location.pathname}${createURL(searchState)}` : ''

export const isClient = typeof window !== 'undefined'
