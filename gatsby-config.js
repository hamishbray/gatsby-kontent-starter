require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Gatsby Kentico Kontent POC',
    description: 'Gatsby start site with Kentico Kontent source',
    author: '@hamishbray',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
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
				usePreviewUrl: true,
				authorizationKey: process.env.KONTENT_PREVIEW_API_KEY,
        // Please note that with the Sample Project generated above, 'en-US' is the default language for the project and this config. For a blank project, this needs to be 'default'.
        languageCodenames: [
          'en-US', // Or the languages in your project (Project settings -> Localization)
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
