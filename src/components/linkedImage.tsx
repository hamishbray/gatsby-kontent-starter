import React from 'react'
import { ImageElement, ImageItem } from '@kentico/gatsby-kontent-components'

type Props = {
	image: ImageItem
}

const LinkedImage: React.FC<Props> = ({ image }: Props) => (
	<ImageElement
		className="my-4"
		width={image.width}
		height={image.height}
		image={image}
		alt={image.description}
	/>
)

export default LinkedImage
