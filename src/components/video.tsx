import React from 'react'
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'

import { Name } from './richText'

export type HostedVideoElement = {
	video_host: {
		value: Name[]
	}
	video_id: {
		value: string
	}
}

export type HostedVideo = {
	host: string
	id: string
}

export const parseHostedVideoElement = (
	hostedVideo: HostedVideoElement
): HostedVideo => ({
	host: hostedVideo.video_host.value[0].name,
	id: hostedVideo.video_id.value,
})

const Video: React.FC<HostedVideo> = ({ id, host }: HostedVideo) =>
	host === 'vimeo' ? (
		<iframe
			className="my-4 hosted-video__wrapper"
			src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`}
			width="640"
			height="360"
			frameBorder="0"
		></iframe>
	) : (
		<div className="my-4">
			<LiteYoutubeEmbed id={id} mute={false} />
		</div>
	)

export default Video
