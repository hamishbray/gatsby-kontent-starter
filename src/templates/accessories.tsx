import React from 'react';
import { PageProps } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { Accessory } from '../node-utils/accessoryPage'

interface Accessories {
	accessories: Accessory[]
}

interface Props {
	pageContext: PageProps & Accessories
}

const Accessories: React.FC<Props> = ({ pageContext }: Props) => (
	<Layout>
		<SEO title="Coffee Accessories" />
		<h1>Accessories</h1>
		<div className="accessories">
			{pageContext.accessories?.map((accessory, index) => (
				<div key={index}>
					<a href={accessory.slug}><h2>{accessory.productName}</h2></a>
					<img width="150" height="150" src={accessory.image?.url} alt={accessory.image?.description} />
					<div dangerouslySetInnerHTML={{ __html: accessory.shortDescription }} />
				</div>
			))}
		</div>
	</Layout>
)

export default Accessories;
