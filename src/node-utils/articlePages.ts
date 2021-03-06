import { resolve } from 'path'
import { Reporter } from 'gatsby'

import { AllKontentResult } from './types'
import { Article, ArticleItem } from '../models/article'

export const createArticlePages = async (
	createPage: any,
	graphql: any,
	reporter: Reporter
) => {
	const result: AllKontentResult<ArticleItem, 'allArticles'> = await graphql(`
		{
			allArticles: allKontentItemArticle {
				nodes {
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
	`)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running Article GraphQL query.`)
		return
	}

	const articles: Article[] =
		result.data?.allArticles.nodes.map(({ fields, elements }) => ({
			slug: fields.slug,
			title: elements.title?.value,
		})) ?? []

	createPage({
		path: `/articles`,
		component: resolve(`src/templates/article/index.tsx`),
		context: {
			articles,
		},
	})

	articles?.forEach(({ slug }) => {
		createPage({
			path: `/article/${slug}`,
			component: resolve(`src/templates/article/article.tsx`),
			context: {
				slug,
			},
		})
	})
}
