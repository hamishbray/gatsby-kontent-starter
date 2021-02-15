import { GatsbyNode } from 'gatsby'
import { createAccessoryPages } from './accessoryPage'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
}) => {
  await createAccessoryPages(createPage, graphql)
}
