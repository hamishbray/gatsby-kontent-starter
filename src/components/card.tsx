import React from 'react'
import { Link } from 'gatsby'
import { ImageElement, ImageItem } from '@kentico/gatsby-kontent-components'

type Props = {
	slug: string
	title: string
	image?: ImageItem
}

const Card: React.FC<Props> = ({ slug, title, image }: Props) => (
	<Link to={`/cafes/${slug}`}>
		<div className="px-4 pb-4 shadow">
			<h4>{title}</h4>
			{image && (
				<ImageElement
					width={300}
					height={200}
					image={image}
					alt={image.description}
				/>
			)}
		</div>
	</Link>
)

export default Card
