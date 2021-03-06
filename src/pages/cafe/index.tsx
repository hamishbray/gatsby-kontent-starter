import React from 'react'
import { graphql, Link } from 'gatsby'
import { ImageElement, ImageItem } from '@kentico/gatsby-kontent-components'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { AllKontentResult } from '../../node-utils/types'
import { CafeItem, parseCafe } from '../../models/cafe'

type Props = AllKontentResult<CafeItem, 'cafes'>

const CafesPage: React.FC<Props> = ({ data }: Props) => {
	const cafes = data?.cafes.nodes.map(({ elements, fields }) =>
		parseCafe(elements, fields)
	)

	return (
		<Layout>
			<SEO title="Cafes" />
			<h1>Our Cafes</h1>
			<div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1 sm:gap-4">
				{cafes?.map(({ city, photo, slug }, index) => (
					<Link key={index} to={`/cafe/${slug}`}>
						<div className="px-4 pb-4 shadow">
							<h4>{city}</h4>
							<ImageElement
								width={300}
								height={200}
								image={(photo as unknown) as ImageItem}
								alt={photo?.description}
							/>
						</div>
					</Link>
				))}
			</div>
		</Layout>
	)
}

export default CafesPage

export const query = graphql`
	{
		cafes: allKontentItemCafe {
			nodes {
				fields {
					slug
				}
				elements {
					city {
						value
					}
					photo {
						value {
							url
							description
							height
							width
						}
					}
				}
			}
		}
	}
`
