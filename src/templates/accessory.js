import React from 'react';

import Layout from '../components/layout';

const Accessory = ({ pageContext }) => (
	<Layout>
		<div className="accessory">
			<div>
				<h1>{pageContext.productName}</h1>
				<img width="150" height="150" src={pageContext.image.url} alt={pageContext.image.description} />
				<div dangerouslySetInnerHTML={{ __html: pageContext.longDescription }} />
			</div>
		</div>
	</Layout>
)

export default Accessory;
