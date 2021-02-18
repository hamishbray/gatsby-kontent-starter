import React from 'react'
import { PageProps, Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { Article } from '../models/article'

type Articles = {
  articles: Article[]
}

type Props = {
  pageContext: PageProps & Articles
}

const Articles: React.FC<Props> = ({ pageContext }: Props) => (
  <Layout>
    <SEO title="Coffee Articles" />
    <h1>Articles</h1>
    <div className="accessories">
      {pageContext.articles?.map((article, index) => (
        <div key={index}>
          <Link to={`/articles/${article.slug}`}>
            <h2>{article.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
)

export default Articles
