import React from 'react'

import { ModularContent } from './richText'
import TweetComponent, { parseTweetElement, TweetElement } from './tweet'
import Video, { parseHostedVideoElement, HostedVideoElement } from './video'

const LinkedItem: React.FC<ModularContent> = ({
	internal,
	elements,
}: ModularContent) => {
	switch (internal.type) {
		case 'kontent_item_tweet':
			return <TweetComponent {...parseTweetElement(elements as TweetElement)} />

		case 'kontent_item_hosted_video':
			return (
				<Video {...parseHostedVideoElement(elements as HostedVideoElement)} />
			)
	}

	return null
}

export default LinkedItem
