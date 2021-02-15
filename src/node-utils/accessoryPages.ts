import { resolve } from 'path'
import { Reporter } from 'gatsby'
import { ElementModels } from '@kentico/kontent-delivery'

import { AllKontentResult } from './types'
import { AccessoryItem } from '../generated-models/accessory'
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


export const createAccessoryPages = async (createPage: any, graphql: any, reporter: Reporter) => {
  const result: AllKontentResult<AccessoryItem, 'allAccessories'> = await graphql(`
    {
      allAccessories: allKontentItemAccessory {
        edges {
          node {
            fields {
              slug
            }
            elements {
              manufacturer {
                value
              }
              price {
                value
              }
              product_name {
                value
              }
              long_description {
                value
              }
              short_description {
                value
              }
              image {
                value {
                  description
                  url
                }
              }
              url_pattern {
                value
              }
              product_status {
                value {
                  codename
                  name
                }
              }
            }
          }
        }
      }
    }
  `)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running Accessory GraphQL query.`)
		return
	}

  const accessories = result.data?.allAccessories.edges.map(
    ({ node }) => parseAccessory(node.elements)
  )

  // All Accessories Page
  createPage({
    path: `/accessories`,
    component: resolve(`src/templates/accessories.tsx`),
    context: {
      accessories,
    },
  })

  // Accessory Pages
  accessories?.forEach(accessory => {
    createPage({
      path: `/accessories/${accessory.slug}`,
      component: resolve(`src/templates/accessory.tsx`),
      context: {
        ...accessory,
      },
    })
  })
}

const parseAccessory = (accessory: AccessoryItem): Accessory => ({
  manufacturer: accessory.manufacturer?.value,
  price: accessory.price?.value,
  productName: accessory.product_name.value,
  productStatus: accessory.product_status.value,
  longDescription: accessory.long_description.value,
  shortDescription: accessory.short_description.value,
  slug: accessory.url_pattern.value,
  image: accessory.image?.value[0],
})
