import { resolve } from 'path'
import { Reporter } from 'gatsby'
import { ElementModels } from '@kentico/kontent-delivery'

import { AllKontentResult } from './types'
import { ArticleItem } from '../generated-models/article'

export interface Article {
	metaDescription?: string
	personas?: ElementModels.TaxonomyTerm[]
	bodyCopy?: string
	postDate?: Date | null
	teaserImage?: ElementModels.AssetModel
	title?: string
	summary?: string
	relatedArticles?: string[]
	urlPattern?: string
  slug: string
}

export const createArticlePages = async (createPage: any, graphql: any, reporter: Reporter) => {
	const result: AllKontentResult<ArticleItem, 'allArticles'> = await graphql(`
		{
			allArticles: allKontentItemArticle {
				edges {
          node {
            fields {
              slug
            }
					}
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running Article GraphQL query.`)
		return
	}

	const articles = result.data?.allArticles.edges.map(
    ({ node }) => node.fields.slug
  )

	articles?.forEach(slug => {
		createPage({
      path: `/articles/${slug}`,
      component: resolve(`src/templates/article.tsx`),
      context: {
        slug,
      },
    })
	})
}
