import React from 'react'
import { Elements } from '@kentico/kontent-delivery'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import { DomElement } from 'html-react-parser'

import { TweetElement } from './tweet'
import { HostedVideoElement } from './video'

import LinkedItem from './linkedItem'
import LinkedImage from './linkedImage'
import LinkedLink, { LinkItem } from './linkedLink'

export type Name = {
	name: string
}

export type ModularContent = {
	internal: {
		type: string
	}
	system: {
		codename: string
	}
	elements: TweetElement | HostedVideoElement
}

export type RichTextElement = Elements.RichTextElement & {
	modular_content: ModularContent[]
}

type Props = {
	bodyCopy: RichTextElement
}

const RichText: React.FC<Props> = ({ bodyCopy }: Props) => (
	<RichTextElement
		value={bodyCopy?.value ?? ''}
		linkedItems={bodyCopy?.modular_content}
		resolveLinkedItem={(linkedItem: ModularContent) => (
			<LinkedItem {...linkedItem} />
		)}
		images={bodyCopy?.images ?? undefined}
		resolveImage={image => <LinkedImage image={image} />}
		links={bodyCopy?.links}
		resolveLink={(link: LinkItem, domNode: DomElement) => (
			<LinkedLink {...{ ...link, domNode }} />
		)}
	/>
)

export default RichText
