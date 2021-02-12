import { GatsbyNode } from 'gatsby'
import { createAccessoryPages } from './accessoryPage'

const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
}) => {
  await createAccessoryPages(createPage, graphql)
}

export default createPages
