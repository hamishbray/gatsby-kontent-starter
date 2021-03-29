import React from 'react'
import { graphql } from 'gatsby'
import { ImageElement, ImageItem } from '@kentico/gatsby-kontent-components'

import { ArticleItem, parseArticle } from '../../models/article'
import { KontentResult } from '../../node-utils/types'
import Layout from '../../components/layout'
import RichText from '../../components/richText'

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
					{teaserImage && (
						<ImageElement
							width={teaserImage.width}
							height={teaserImage.height}
							image={(teaserImage as unknown) as ImageItem}
							alt={teaserImage.description}
						/>
					)}
					<p className="mt-4 italic">Posted: {postDate}</p>
					<div className="mt-4">
						<RichText {...{ bodyCopy }} />
					</div>
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
					links {
						link_id
						type
						url_slug
					}
					images {
						description
						height
						url
						width
						image_id
					}
					modular_content {
						internal {
							type
						}
						... on kontent_item_hosted_video {
							id
							elements {
								video_host {
									value {
										name
									}
								}
								video_id {
									value
								}
							}
							system {
								codename
							}
						}
						... on kontent_item_tweet {
							elements {
								display_options {
									value {
										name
									}
								}
								tweet_link {
									value
								}
								theme {
									value {
										name
									}
								}
							}
							system {
								codename
							}
						}
					}
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
