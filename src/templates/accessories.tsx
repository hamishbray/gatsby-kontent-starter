import React from 'react'
import { Link, PageProps } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { Accessory } from '../models/accessory'

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
    <div className="accessories">
      {pageContext.accessories?.map((accessory, index) => (
        <div key={index}>
          <Link to={`/accessories/${accessory.slug}`}>
            <h2>{accessory.productName}</h2>
          </Link>
          <img
            width="150"
            height="150"
            src={accessory.image?.url}
            alt={accessory.image?.description}
          />
          <div
            dangerouslySetInnerHTML={{ __html: accessory.shortDescription }}
          />
        </div>
      ))}
    </div>
  </Layout>
)

export default Accessories
