import { resolve } from 'path'
import { Reporter } from 'gatsby'
import { ElementModels, Elements, ContentItem } from '@kentico/kontent-delivery'

import { AllKontentResult } from './types'
//import { ArticleItem } from '../generated-models/article'

export interface ArticleItem {
  personas?: Elements.TaxonomyElement
  body_copy?: Elements.RichTextElement
  post_date?: Elements.DateTimeElement
  teaser_image?: Elements.AssetsElement
  title?: Elements.TextElement
  summary?: Elements.TextElement
  sitemap?: Elements.TaxonomyElement
  meta_description?: Elements.TextElement
  related_articles?: Elements.LinkedItemsElement<ContentItem>
  url_pattern?: Elements.UrlSlugElement
}

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
  slug?: string
}

export const parseArticle = (article: ArticleItem): Article => ({
  metaDescription: article.meta_description?.value,
	personas: article.personas?.value,
	bodyCopy: article.body_copy?.value,
	postDate: article.post_date?.value,
	teaserImage: article.teaser_image?.value[0],
	title: article.title?.value,
	summary: article.summary?.value,
	relatedArticles: article.related_articles?.itemCodenames,
	urlPattern: article.url_pattern?.value,
  slug: article.url_pattern?.value,
})

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
