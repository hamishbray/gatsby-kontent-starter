import { ElementModels, Elements, ContentItem } from '@kentico/kontent-delivery'

import { RichTextElement } from '../components/richText'
import { KontentItem } from '../node-utils/types'

export type RelatedArticle = {
	fields: {
		slug: string
	}
}

export interface ArticleItem {
	personas?: Elements.TaxonomyElement
	body_copy?: RichTextElement
	post_date?: Elements.DateTimeElement
	teaser_image?: Elements.AssetsElement
	title?: Elements.TextElement
	summary?: Elements.TextElement
	sitemap?: Elements.TaxonomyElement
	meta_description?: Elements.TextElement
	related_articles?: Elements.LinkedItemsElement<KontentItem<ArticleItem>>
	url_pattern?: Elements.UrlSlugElement
}

export interface Article {
	metaDescription?: string
	personas?: ElementModels.TaxonomyTerm[]
	bodyCopy?: RichTextElement
	postDate?: Date | null
	teaserImage?: ElementModels.AssetModel
	title?: string
	summary?: string
	relatedArticles?: Article[]
	urlPattern?: string
	slug?: string
}

export const parseArticle = (article: ArticleItem): Article => ({
	metaDescription: article.meta_description?.value,
	personas: article.personas?.value,
	bodyCopy: article.body_copy,
	postDate: article.post_date?.value,
	teaserImage: article.teaser_image?.value[0],
	title: article.title?.value,
	summary: article.summary?.value,
	relatedArticles: article.related_articles?.value.map(item =>
		parseArticle(item.elements)
	),
	urlPattern: article.url_pattern?.value,
	slug: article.url_pattern?.value,
})
