import { ElementModels, Elements, ContentItem } from '@kentico/kontent-delivery'

import { RichTextElement } from '../components/richText'
import { KontentItem } from '../node-utils/types'

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
	type?: string
}

export const parseArticle = ({
	elements,
	fields,
}: KontentItem<ArticleItem>): Article => ({
	metaDescription: elements.meta_description?.value,
	personas: elements.personas?.value,
	bodyCopy: elements.body_copy,
	postDate: elements.post_date?.value,
	teaserImage: elements.teaser_image?.value[0],
	title: elements.title?.value,
	summary: elements.summary?.value,
	relatedArticles: elements.related_articles?.value.map(item =>
		parseArticle({ ...item })
	),
	urlPattern: elements.url_pattern?.value,
	slug: fields.slug,
})
