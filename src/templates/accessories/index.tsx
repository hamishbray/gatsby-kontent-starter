import React from 'react'
import { Link, PageProps } from 'gatsby'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

import { Accessory } from '../../models/accessory'

type Accessories = {
  accessories: Accessory[]
}

type Props = {
  pageContext: PageProps & Accessories
}

const Accessories: React.FC<Props> = ({ pageContext }: Props) => (
  <Layout>
    <SEO title="Coffee Accessories" />
    <h1>Accessories</h1>
    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1 md:gap-4 accessories">
      {pageContext.accessories?.map((accessory, index) => (
        <div key={index} className="px-4 pb-4 shadow">
          <Link to={`/accessories/${accessory.slug}`}>
						<img
							src={accessory.image?.url}
							alt={accessory.image?.description}
						/>
						<h2>{accessory.productName}</h2>
						<div
							dangerouslySetInnerHTML={{ __html: accessory.shortDescription }}
						/>
					</Link>
        </div>
      ))}
    </div>
  </Layout>
)

export default Accessories
