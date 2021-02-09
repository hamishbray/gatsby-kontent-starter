module.exports = ({ node, actions: { createNodeField } }) => {
	if (node.internal.type === `kontent_item_accessory`) {
		createNodeField({
			node,
			name: `slug`,
			value: node.elements.url_pattern.value,
		})
	}
}
