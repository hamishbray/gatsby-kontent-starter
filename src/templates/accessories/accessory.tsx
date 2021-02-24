import React from 'react'
import { PageProps } from 'gatsby'

import Layout from '../../components/layout'
import { Accessory } from '../../models/accessory'

type Props = {
  pageContext: PageProps & Accessory
}

const AccessoryPage: React.FC<Props> = ({ pageContext }: Props) => (
  <Layout>
    <div className="accessory">
      <div>
        <h1>{pageContext.productName}</h1>
        <img
          width="150"
          height="150"
          src={pageContext.image?.url}
          alt={pageContext.image?.description}
        />
        <div
          dangerouslySetInnerHTML={{ __html: pageContext.longDescription }}
        />
      </div>
    </div>
  </Layout>
)

export default AccessoryPage
