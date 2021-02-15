import { GatsbyNode } from 'gatsby'
import { createAccessoryPages } from './accessoryPages'
import { createArticlePages } from './articlePages'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
	reporter,
}) => {
  await createAccessoryPages(createPage, graphql, reporter)
	await createArticlePages(createPage, graphql, reporter)
}
