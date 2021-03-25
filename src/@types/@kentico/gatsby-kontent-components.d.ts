declare module '@kentico/gatsby-kontent-components' {
	interface ImageItem {
		image_id: string
		url: string
		description?: string
		name?: string
		height: number
		width: number
		type?: string
	}

	interface ImageOptions {
		fit?: 'crop' | 'clip' | 'scale'
		quality?: number
		lossless?: boolean
	}

	interface GetGatsbyImageDataProps {
		image: ImageItem
		width?: number
		height?: number
		layout?: import('gatsby-plugin-image').Layout
		backgroundColor?: string
		sizes?: string
		aspectRatio?: number
		options?: ImageOptions
	}

	interface ImageElementProps
		extends GetGatsbyImageDataProps,
			Omit<import('gatsby-plugin-image').GatsbyImageProps, 'image' | 'alt'> {
		alt?: string
	}

	let ImageElement: ({
		image,
		width,
		height,
		layout,
		backgroundColor,
		sizes,
		aspectRatio,
		options,
		alt,
		...props
	}: ImageElementProps) => JSX.Element

	interface RichTextElementProps {
		value: string
		linkedItems?: any[]
		resolveLinkedItem?: Function
		images?: ImageItem[]
		resolveImage?: ((image?: ImageItem) => JSX.Element) | undefined
		links?: any[]
		resolveLink?: Function
		resolveDomNode?: Function
	}

	let RichTextElement: ({
		value,
		linkedItems,
		resolveLinkedItem,
		images,
		resolveImage,
		links,
		resolveLink,
		resolveDomNode,
	}: RichTextElementProps) => JSX.Element

	export { ImageElement, RichTextElement, ImageItem }
}
