// @ts-nocheck - lots of unknown types below. e.g. node.elements
import { GatsbyNode } from 'gatsby'
import slugify from '@sindresorhus/slugify'
import crypto from 'crypto'

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNodeField, createNode, createParentChildLink },
  createNodeId,
}) => {
	const createSlugField = (value: string): void =>
    createNodeField({
      node,
      name: `slug`,
      value,
    })

	const createSearchableItemNode = (typeFieldData: Object): void => {
		const fieldData = {
			modified: node.system.last_modified,
			modified_unix: toUnix(node.system.last_modified),
			type: node.system.type,
			...typeFieldData,
		}

		const nodeData = {
			...fieldData,
			id: createNodeId(`${node.id}__SearchableItem`),
			parent: node.id,
			children: [],
			internal: {
				type: 'SearchableItem',
				contentDigest: crypto
					.createHash(`md5`)
					.update(JSON.stringify(fieldData))
					.digest(`hex`),
			},
		}

		createNode(nodeData)
		createParentChildLink({ parent: node, child: nodeData})
	}

	let typeFieldData = {}

  switch (node.internal.type) {
    case 'kontent_item_accessory':
      createSlugField(node.elements.url_pattern.value)
			typeFieldData = {
				content: node.elements.long_description.value,
				summary: node.elements.short_description.value,
				title: node.elements.product_name.value,
				imageUrl: node.elements.image.value[0].url,
				url: `/accessories/${node.fields.slug}`,
			}
			createSearchableItemNode(typeFieldData)
      break

    case 'kontent_item_article':
      createSlugField(node.elements.url_pattern.value)
			typeFieldData = {
				content: node.elements.body_copy.value,
				summary: node.elements.summary.value,
				title: node.elements.title.value,
				published: node.elements.post_date.value,
				published_unix: toUnix(node.elements.post_date.value),
				imageUrl: node.elements.teaser_image.value[0].url,
				url: `/articles/${node.fields.slug}`,
			}
			createSearchableItemNode(typeFieldData)
      break

    case 'kontent_item_cafe':
      createSlugField(slugify(node.elements.city.value))
			typeFieldData = {
				title: node.elements.city.value,
				imageUrl: node.elements.photo.value[0].url,
				url: `/cafes/${node.fields.slug}`
			}
			createSearchableItemNode(typeFieldData)
  }
}

const toUnix = (date: string): string => Math.floor(new Date(date) / 1000)

export default onCreateNode
