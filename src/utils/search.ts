import algoliasearch, { SearchClient } from 'algoliasearch/lite'
import qs from 'qs'
import { WindowLocation } from '@reach/router'

interface QueryParams {
  query?: string
  page?: number
  type?: string[]
}

type RefinementList = {
  type: string[]
}

type SearchState = {
  query?: string
  page?: number
  refinementList?: RefinementList
	//category?: string 
}

const getCategorySlug = (name: string) =>
  name.split(' ').map(encodeURIComponent).join('+')

const getCategoryName = (slug: string): string =>
  slug.split('+').map(decodeURIComponent).join(' ')

export const DEBOUNCE_TIME = 1000
export const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME as string

export const getSearchClient = (): SearchClient => {
  const appId = process.env.ALGOLIA_APP_ID as string
  const apiKey = process.env.ALGOLIA_API_KEY as string
  return algoliasearch(appId, apiKey)
}

export const createURL = ({ query, page, refinementList }: SearchState) => {
  // if it's default route
  if (
    !query &&
    page === 1 &&
    refinementList &&
    refinementList.type.length === 0
  )
    return ''

  // const categoryPath = menu.categories
  // ? `${getCategorySlug(menu.categories)}/`
  // : '';

  const queryParameters: QueryParams = {}

  if (query) queryParameters.query = encodeURIComponent(query)

  if (page !== 1) queryParameters.page = page

  if (refinementList?.type)
    queryParameters.type = refinementList.type.map(encodeURIComponent)

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  })

  return `/search/${queryString}`
}

export const searchStateFromUrl = (
  location: WindowLocation | undefined
): SearchState => {
  // const pathnameMatches = location?.pathname.match(/search\/(.*?)\/?$/)
  // const category = getCategoryName(
  //   (pathnameMatches && pathnameMatches[1]) || ''
  // )
  const { query = '', page = 1, type = [] } = qs.parse(
    location?.search.slice(1) ?? ''
  )

  // `qs` does not return an array when there's a single value.
  const allTypes = Array.isArray(type) ? type : [type].filter(Boolean)

  return {
    query: decodeURIComponent(query as string),
    page: page as number,
    refinementList: {
      type: allTypes.map(type => decodeURIComponent(type as string)),
    },
  }
}

export const searchStateToUrl = (search: SearchState) =>
  search ? createURL(search) : ''

export const isClient = typeof window !== 'undefined'
