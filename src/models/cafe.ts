import { ElementModels, Elements, ContentItem } from '@kentico/kontent-delivery'

import { Fields } from '../node-utils/types'

export interface CafeItem {
	phone?: Elements.TextElement
	city?: Elements.TextElement
	photo?: Elements.AssetsElement
	email?: Elements.TextElement
	country?: Elements.TextElement
	street?: Elements.TextElement
	state?: Elements.TextElement
	zip_code?: Elements.TextElement
	url_pattern?: Elements.UrlSlugElement
}

export interface Cafe {
	phone?: string
	city?: string
	photo?: ElementModels.AssetModel
	email?: string
	country?: string
	street?: string
	state?: string
	urlPattern?: string
	zipCode?: string
	slug?: string
}

export const parseCafe = (cafe: CafeItem, fields?: Fields): Cafe => ({
	phone: cafe.phone?.value,
	city: cafe.city?.value,
	photo: cafe.photo?.value[0],
	email: cafe.email?.value,
	country: cafe.country?.value,
	street: cafe.street?.value,
	state: cafe.state?.value,
	urlPattern: cafe.url_pattern?.value,
	zipCode: cafe.zip_code?.value,
	slug: fields?.slug,
})
