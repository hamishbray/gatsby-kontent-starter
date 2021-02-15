import React from 'react';
import { PageProps, graphql } from 'gatsby'

import Layout from '../components/layout';
import { Article } from '../node-utils/articlePages';

interface Props {
	pageContext: PageProps & Article
}

const ArticlePage: React.FC = ({ data }: any) => (
	<Layout>
		<div className="article">
			<div>
				<h1>{data.article.elements.title.value}</h1>
			</div>
		</div>
	</Layout>
)

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
					value
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
