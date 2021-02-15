import { GatsbyNode } from 'gatsby'

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions: { createNodeField } }) => {
	if (node.internal.type === `kontent_item_accessory`) {
		createNodeField({
			node,
			name: `slug`,
			//@ts-ignore
			value: node.elements.url_pattern.value,
		})
	}
}

export default onCreateNode
