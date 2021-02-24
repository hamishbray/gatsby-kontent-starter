import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import { ArticleItem, parseArticle } from '../../models/article'
import { KontentResult } from '../../node-utils/types'

type Props = KontentResult<ArticleItem, 'articleItem'>

const ArticlePage: React.FC<Props> = ({ data }: Props) => {
  const { title, teaserImage, bodyCopy, postDate } = parseArticle(
    data?.articleItem.elements ?? ({} as ArticleItem)
  )

  return (
    <Layout>
      <article className="article">
        <div>
          <h1>{title}</h1>
          <img
            width={teaserImage?.width}
            height={teaserImage?.height}
            src={teaserImage?.url}
            alt={teaserImage?.description}
          />
          <p className="mt-4 italic">Posted: {postDate}</p>
          <div dangerouslySetInnerHTML={{ __html: bodyCopy ?? '' }} />
        </div>
      </article>
    </Layout>
  )
}

export default ArticlePage

export const query = graphql`
  query articleBySlug($slug: String!) {
    articleItem: kontentItemArticle(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      elements {
        body_copy {
          value
        }
        meta_description {
          value
        }
        personas {
          value {
            codename
            name
          }
        }
        post_date {
          value(formatString: "MMM Do, YYYY")
        }
        related_articles {
          value {
            id
          }
        }
        summary {
          value
        }
        teaser_image {
          value {
            description
            url
            height
            width
          }
        }
        title {
          value
        }
      }
    }
  }
`
