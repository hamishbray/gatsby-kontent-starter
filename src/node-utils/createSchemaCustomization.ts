import {
  GatsbyNode,
  CreateSchemaCustomizationArgs,
  NodePluginSchema,
} from 'gatsby'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions: { createFieldExtension, createTypes },
  schema: { buildObjectType },
}: CreateSchemaCustomizationArgs): any => {
  // Create @url resolver for auto-generating url fields.
  // createFieldExtension({
  //   name: 'url',
  //   args: {
  //     slug: {
  //       type: 'String!',
  //       defaultValue: 'elements.url_pattern.value',
  //     },
  //   },
  //   extend(options: any) {
  //     return {
  //       resolve(source: any) {
  //         const slug = source[options.slug]
  //         const type = source.internal.type
  //         return resolveUrl(type, slug)
  //       },
  //     }
  //   },
  // })

  // createFieldExtension({
  //   name: 'slug',
  //   args: {
  //     slug: {
  //       type: 'String!',
  //       defaultValue: 'elements.slug',
  //     },
  //   },
  //   extend(options: any) {
  //     return {
  //       resolve(source: any) {
  //         return source[options.slug]
  //       },
  //     }
  //   },
  // })

	// const slugs = buildObjectType({
	// 	name: 'KontentItemArticle',
	// 	interfaces: ['Node'],

	// 	fields: {
	// 		slug: {
	// 			type: 'String!',
	// 			resolve: (source, args, context, info) => {
	// 				return source.elements.url_pattern.value
	// 			},
	// 		},
	// 	},
	// 	extensions: {
	//		infer: true,
	// 	},
	// })

	// createTypes([slugs])

  // Create custom schema interfaces and extend types.
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
    // interface NodeWithUrl implements Node {
    //   id: ID!
    //   url: String!
    // }
    // type KontentItemArticle implements Node @infer {
    //   id: ID!
    //   url: String!
    // }
    // type KontentItemCafe implements Node @infer {
    //   id: ID!
    //   url: String!
    // }
    // type KontentItemAccessory implements Node  @infer {
    //   id: ID!
    //   url: String!
    // }
  //`

  createTypes(typeDefs)
}

const resolveUrl = (type: string, slug: string): string => `/${type}/${slug}`
