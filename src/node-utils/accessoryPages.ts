import { resolve } from 'path'
import { Reporter } from 'gatsby'

import { AllKontentResult } from './types'
import { AccessoryItem, parseAccessory } from '../models/accessory'

export const createAccessoryPages = async (
  createPage: any,
  graphql: any,
  reporter: Reporter
) => {
  const result: AllKontentResult<
    AccessoryItem,
    'allAccessories'
  > = await graphql(`
    {
      allAccessories: allKontentItemAccessory {
        nodes {
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
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running Accessory GraphQL query.`)
    return
  }

  const accessories = result.data?.allAccessories.nodes.map(({ elements }) =>
    parseAccessory(elements)
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
