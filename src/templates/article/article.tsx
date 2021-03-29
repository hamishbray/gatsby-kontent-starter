import React from 'react'
import { graphql, Link } from 'gatsby'
import { ImageElement, ImageItem } from '@kentico/gatsby-kontent-components'

import { ArticleItem, parseArticle } from '../../models/article'
import { KontentResult } from '../../node-utils/types'
import Layout from '../../components/layout'
import RichText from '../../components/richText'
import Card from '../../components/card'

type Props = KontentResult<ArticleItem, 'articleItem'>

const ArticlePage: React.FC<Props> = ({ data }: Props) => {
	const {
		title,
		teaserImage,
		bodyCopy,
		postDate,
		relatedArticles,
		personas,
	} = parseArticle(data?.articleItem.elements ?? ({} as ArticleItem))

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

					{personas && (
						<p className="flex my-4">
							{personas.map(({ name }, index) => (
								<span
									key={index}
									className="px-3 py-1 mr-2 text-white bg-yellow-900 rounded-full"
								>
									{name}
								</span>
							))}
						</p>
					)}

					<div className="mt-4">
						{bodyCopy && <RichText {...{ bodyCopy }} />}
					</div>

					{relatedArticles && relatedArticles.length > 0 && (
						<>
							<h2>Related Articles</h2>
							<div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1 sm:gap-4">
								{relatedArticles.map(
									({ title = '', teaserImage, slug = '' }, index) => (
										<Card
											key={index}
											{...{
												title,
												image: (teaserImage as unknown) as ImageItem,
												slug,
											}}
										/>
									)
								)}
							</div>
						</>
					)}
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
						name
					}
				}
				post_date {
					value(formatString: "MMM Do, YYYY")
				}
				related_articles {
					value {
						... on kontent_item_article {
							fields {
								slug
							}
							elements {
								title {
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
							}
						}
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
