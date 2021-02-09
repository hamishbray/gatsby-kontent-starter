var path = require('path')

module.exports = async ({ graphql, actions: { createPage } }) => {

	var result = await graphql(`
		{
			allKontentItemAccessory {
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
						}
					}
				}
			}
		}
	`)

	// All Accessories Page
	createPage({
		path: `/accessories`,
		component: path.resolve(`src/templates/accessories.js`),
		context: {
			accessories: result.data.allKontentItemAccessory.edges,
		}
	})

	// Accessory Pages
	result.data.allKontentItemAccessory.edges.forEach(({ node }) => {
		const { manufacturer, price, product_name, long_description, image } = node.elements
		const { slug } = node.fields

		createPage({
			path: `/accessories/${slug}`,
			component: path.resolve(`src/templates/accessory.js`),
			context: {
				slug,
				manufacturer: manufacturer.value,
				price: price.value,
				productName: product_name.value,
				longDescription: long_description.value,
				image: image.value[0],
			}
		})
	})
}
