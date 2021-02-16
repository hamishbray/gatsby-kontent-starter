import { Elements, ElementModels } from '@kentico/kontent-delivery'

export interface AccessoryItem {
  manufacturer: Elements.TextElement
  price: Elements.NumberElement
  product_name: Elements.TextElement
  product_status: Elements.TaxonomyElement
  long_description: Elements.RichTextElement
  short_description: Elements.RichTextElement
  url_pattern: Elements.UrlSlugElement
  image: Elements.AssetsElement
}

export interface Accessory {
  manufacturer?: string
  price?: number | null | undefined
  productName: string
  productStatus: ElementModels.TaxonomyTerm[]
  longDescription: string
  shortDescription: string
  image?: ElementModels.AssetModel
  slug: string
}

export const parseAccessory = (accessory: AccessoryItem): Accessory => ({
  manufacturer: accessory.manufacturer?.value,
  price: accessory.price?.value,
  productName: accessory.product_name.value,
  productStatus: accessory.product_status.value,
  longDescription: accessory.long_description.value,
  shortDescription: accessory.short_description.value,
  slug: accessory.url_pattern.value,
  image: accessory.image?.value[0],
})
