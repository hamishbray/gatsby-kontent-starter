import { GatsbyNode } from 'gatsby'

export const onCreatePage: GatsbyNode['onCreatePage'] = ({
  page,
  actions: { createPage },
}) => {
  if (page.path.match(/^\/account/)) {
    page.matchPath = '/account/*'
  }

  createPage(page)
}
