import React from 'react';

import Layout from '../components/layout';

const Accessories = ({ pageContext }) => (
	<Layout>
		<h1>Accessories</h1>
		<div className="accessories">
			{pageContext.accessories?.map(({ node }, index) => (
				<div key={index}>
					<a href={node.fields.slug}><h2>{node.elements.product_name.value}</h2></a>
					<img width="150" height="150" src={node.elements.image.value[0].url} alt={node.elements.image.value[0].description} />
					<div dangerouslySetInnerHTML={{ __html: node.elements.short_description.value }} />
				</div>
			))}
		</div>
	</Layout>
)

export default Accessories;
