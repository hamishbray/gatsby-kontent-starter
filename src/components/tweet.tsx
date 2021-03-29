import React, { useEffect, useState } from 'react'
import { Name } from './richText'

export type TweetElement = {
	display_options: {
		value: Name[]
	}
	tweet_link: {
		value: string
	}
	theme: {
		value: Name[]
	}
}

export type Tweet = {
	link: string
	displayOptions: string
	theme: string
}

export const parseTweetElement = (tweet: TweetElement): Tweet => ({
	link: tweet.tweet_link.value,
	displayOptions: tweet.display_options.value[0].name,
	theme: tweet.theme.value[0].name,
})

const TweetComponent: React.FC<Tweet> = ({
	link,
	displayOptions,
	theme,
}: Tweet) => {
	// const [tweet, setTweet] = useState(null)

	// const getTweet = async () => {
	// 	const response = await fetch(
	// 		`https://publish.twitter.com/oembed?url=${link}`,
	// 		{
	// 			mode: 'no-cors',
	// 		}
	// 	)
	// 	const result = await response.json()
	// 	setTweet(result)
	// }

	// useEffect(() => {
	// 	getTweet()
	// }, [])
	return (
		<div className="my-4">
			<a href={link}>Tweet</a>
		</div>
	)
}

export default TweetComponent
