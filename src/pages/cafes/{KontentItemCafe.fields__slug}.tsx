import React from 'react'
import { graphql, PageProps } from 'gatsby'

import { KontentResult } from '../../node-utils/types'
import { CafeItem, parseCafe } from '../../models/cafe'

type Props = PageProps & KontentResult<CafeItem, 'cafeItem'>

const CafePage: React.FC<Props> = ({ data }: Props) => {
	const { city, country, email, phone, photo, state, street, zipCode } = parseCafe(
    data?.cafeItem.elements ?? {} as CafeItem
  )
	return (
		<div>
			<h1>{city}</h1>
			<img
				width={photo?.width}
				height={photo?.height}
				src={photo?.url}
				alt={photo?.description}
			/>
			<span className="block">Address:
				{street && <span>{' '} {street}</span>}
				{city && <span>{' '} {city}</span>}
				{state && <span>{' '} {state}</span>}
				{country && <span>{' '} {country}</span>}
				{zipCode && <span>{' '} {zipCode}</span>}
			</span>
			<span className="block">Email: {email}</span>
			<span className="block">Phone: {phone}</span>
		</div>
	)
}

export default CafePage

export const query = graphql`
  query cafeByCity($id: String!) {
    cafeItem: kontentItemCafe(id: {eq: $id}) {
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