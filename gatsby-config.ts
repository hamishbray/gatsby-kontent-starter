require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

export const siteMetadata = {
	title: 'Gatsby Kentico Kontent POC',
	description: 'Gatsby starter site with Kentico Kontent source',
	author: '@hamishbray',
}

export const flags = {
  FAST_DEV: true,
}

const queries = [
	{
		query: `
			{
				allSearchableItem {
					edges {
						node {
							objectID: id
							content
							modified
							modified_unix
							published
							published_unix
							summary
							title
							type
							url
							_tags: tags
						}
					}
				}
			}
		`,
		settings: {
			searchableAttributes: ['title', 'type'],
			attributesForFaceting: ['type'],
		},
		transformer: ({ data }: { data: any }) => 
			data.allSearchableItem.edges.map(({ node }: { node: any }) => node),
	},
]

export const plugins = [
	'gatsby-plugin-postcss',
	'gatsby-plugin-typescript',
	'gatsby-plugin-react-helmet',
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			name: 'images',
			path: `${__dirname}/src/images`,
		},
	},
	'gatsby-plugin-image',
	'gatsby-transformer-sharp',
	'gatsby-plugin-sharp',
	{
		resolve: 'gatsby-plugin-manifest',
		options: {
			name: 'gatsby-starter-default',
			short_name: 'starter',
			start_url: '/',
			background_color: '#663399',
			theme_color: '#663399',
			display: 'minimal-ui',
			icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
		},
	},
	{
		resolve: '@kentico/gatsby-source-kontent',
		options: {
			projectId: process.env.KONTENT_PROJECT_ID,
			//usePreviewUrl: true,
			//authorizationKey: process.env.KONTENT_PREVIEW_API_KEY,
			// Please note that with the Sample Project generated above, 'en-US' is the default language for the project and this config. For a blank project, this needs to be 'default'.
			languageCodenames: [
				'en-US', // Or the languages in your project (Project settings -> Localization)
			],
		},
	},
	{
		resolve: `gatsby-plugin-netlify-identity`,
		options: {
			url: `https://gatsby-kontent-starter.netlify.app/` // required!
		}
	},
	{
		resolve: `gatsby-plugin-algolia`,
		options: {
			appId: process.env.GATSBY_ALGOLIA_APP_ID,
			apiKey: process.env.ALGOLIA_API_KEY,
			indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
			queries,
			enablePartialUpdates: true,
			matchFields: ['modified'],
		},
	},
]
