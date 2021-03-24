import { GatsbyNode, CreateSchemaCustomizationArgs } from 'gatsby'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
	actions: { createTypes },
}: CreateSchemaCustomizationArgs): any => {
	// Create Searchable Item Node type
	const typeDefs = `
    type SearchableItem implements Node @dontInfer {
      id: ID!
      content: String
			summary: String
      modified: Date! @dateformat
      modified_unix: Int!
      published: Date @dateformat
      published_unix: Int
      tags: [String!]
      title: String!
      type: String!
			imageUrl: String
      url: String
    }
	`

	createTypes(typeDefs)
}
