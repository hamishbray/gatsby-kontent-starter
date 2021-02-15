import { GatsbyNode } from 'gatsby'
import { createAccessoryPages } from './accessoryPages'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
}) => {
  await createAccessoryPages(createPage, graphql)
}
