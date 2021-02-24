import React from 'react'
import { graphql, Link } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { AllKontentResult } from '../../node-utils/types'
import { CafeItem, parseCafe } from '../../models/cafe'

type Props = AllKontentResult<CafeItem, 'cafes'>

const CafesPage: React.FC<Props> = ({ data }: Props) => {
  const cafes = data?.cafes.nodes.map(({ elements, fields }) => parseCafe(elements, fields))

  return (
    <Layout>
      <SEO title="Cafes" />
      <h1>Our Cafes</h1>
      {cafes?.map(({ city, photo, slug }, index) => (
        <div key={index}>
          <Link to={`/cafes/${slug}`}>
            <h2>{city}</h2>
          </Link>
          <img
            width={photo?.width}
            height={photo?.height}
            src={photo?.url}
            alt={photo?.description}
          />
        </div>
      ))}
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
