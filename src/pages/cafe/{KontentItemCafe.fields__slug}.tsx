import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { ImageElement, ImageItem } from '@kentico/gatsby-kontent-components'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { KontentResult } from '../../node-utils/types'
import { CafeItem, parseCafe } from '../../models/cafe'

type Props = PageProps & KontentResult<CafeItem, 'cafeItem'>

const CafePage: React.FC<Props> = ({ data }: Props) => {
	const {
		city,
		country,
		email,
		phone,
		photo,
		state,
		street,
		zipCode,
	} = parseCafe(data?.cafeItem.elements ?? ({} as CafeItem))

	return (
		<Layout>
			<SEO title={`Cafe - ${city ?? ''}`} />
			<h1>{city}</h1>
			<ImageElement
				width={photo?.width}
				height={photo?.height}
				image={(photo as unknown) as ImageItem}
				alt={photo?.description}
			/>
			<div className="mt-8">
				<span className="block">
					<span className="italic">Address:</span>
					{street && <span> {street}</span>}
					{city && <span> {city}</span>}
					{state && <span> {state}</span>}
					{country && <span> {country}</span>}
					{zipCode && <span> {zipCode}</span>}
				</span>
				<span className="block">
					<span className="italic">Email:</span> {email}
				</span>
				<span className="block">
					<span className="italic">Phone:</span> {phone}
				</span>
			</div>
		</Layout>
	)
}

export default CafePage

export const query = graphql`
	query cafeByCity($id: String!) {
		cafeItem: kontentItemCafe(id: { eq: $id }) {
			fields {
				slug
			}
			elements {
				city {
					value
				}
				country {
					value
				}
				email {
					value
				}
				phone {
					value
				}
				photo {
					value {
						description
						height
						url
						width
					}
				}
				state {
					value
				}
				street {
					value
				}
				zip_code {
					value
				}
			}
		}
	}
`
