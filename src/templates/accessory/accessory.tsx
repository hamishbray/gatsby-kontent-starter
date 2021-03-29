import React from 'react'
import { PageProps } from 'gatsby'
import { ImageElement, ImageItem } from '@kentico/gatsby-kontent-components'

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
				<ImageElement
					width={300}
					height={300}
					image={(pageContext.image as unknown) as ImageItem}
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
