import React from 'react';
import { PageProps, graphql } from 'gatsby'

import Layout from '../components/layout';
import { ArticleItem, parseArticle } from '../node-utils/articlePages';

interface Props {
	data: {
		article: {
			elements: ArticleItem
		}
	}
}

const ArticlePage: React.FC<Props> = ({ data }: Props) => {
	const { title, teaserImage, bodyCopy, postDate } = parseArticle(data.article.elements)

	return (
		<Layout>
			<article className="article">
				<div>
					<h1>{title}</h1>
					<img width={teaserImage?.width} height={teaserImage?.height} src={teaserImage?.url} alt={teaserImage?.description} />
					<p>Posted: {postDate}</p>
					<div dangerouslySetInnerHTML={{ __html: bodyCopy ?? '' }} />
				</div>
			</article>
		</Layout>
	)
}

export const query = graphql`
	query articleBySlug($slug: String!) {
		article: kontentItemArticle(fields: { slug: { eq: $slug } }) {
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

export default ArticlePage;
