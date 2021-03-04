import React from 'react'
import { Link } from 'gatsby'

type Props = {
	hit: {
		summary?: string
		title: string
		type: string
		url: string
	}
}

const Hit: React.FC<Props> = ({ hit }: Props) => (
	<div>
		<Link to={hit.url}><h2>{hit.title}</h2></Link>
		<div className="mb-4" dangerouslySetInnerHTML={{__html: hit.summary ?? ''}}></div>
		<div className="mt-4"><span className="italic">{hit.type}</span></div>
	</div>
)

export default Hit
