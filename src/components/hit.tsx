import React from 'react'

type Props = {
	hit: {
		summary?: string
		title: string
		type: string
	}
}

const Hit: React.FC<Props> = ({ hit }: Props) => (
	<div>
		<h2>{hit.title}</h2>
		<div className="mb-4" dangerouslySetInnerHTML={{__html: hit.summary ?? ''}}></div>
		<div className="mt-4"><span className="italic">{hit.type}</span></div>
	</div>
)

export default Hit
