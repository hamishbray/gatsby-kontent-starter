import { resolve } from 'path'
import { Reporter } from 'gatsby'

import { AllKontentResult } from './types'
import { Article, ArticleItem } from '../models/article'

export const createArticlePages = async (createPage: any, graphql: any, reporter: Reporter) => {
	const result: AllKontentResult<ArticleItem, 'allArticles'> = await graphql(`
		{
			allArticles: allKontentItemArticle {
				edges {
          node {
            fields {
              slug
            }
						elements {
							title {
								value
							}
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

	const articles: Article[] = result.data?.allArticles.edges.map(
    ({ node }) => ({ slug: node.fields.slug, title: node.elements.title?.value })
  ) ?? []

	createPage({
		path: `articles`,
		component: resolve(`src/templates/articles.tsx`),
		context: {
			articles
		}
	})

	articles?.forEach(article => {
		createPage({
      path: `/articles/${article.slug}`,
      component: resolve(`src/templates/article.tsx`),
      context: {
        slug: article.slug,
      },
    })
	})
}
