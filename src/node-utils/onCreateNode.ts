import { GatsbyNode } from 'gatsby'
import slugify from '@sindresorhus/slugify'

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNodeField },
}) => {
  if (
    node.internal.type === `kontent_item_accessory` ||
    node.internal.type === `kontent_item_article`
  ) {
    createNodeField({
      node,
      name: `slug`,
      //@ts-ignore
      value: node.elements.url_pattern.value,
    })
  }

	if(node.internal.type === `kontent_item_cafe`) {
		createNodeField({
			node,
			name: `slug`,
			//@ts-ignore
      value: slugify(node.elements.city.value),
		})
	}
}

export default onCreateNode
