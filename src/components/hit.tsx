import React from 'react'
import { Link } from 'gatsby'
import { Hit } from 'react-instantsearch-core'

type Props = {
	hit: Hit<{
		summary?: string
		title: string
		type: string
		url: string
	}>
}

const HitResult: React.FC<Props> = ({ hit }: Props) => (
	<div>
		<Link to={hit.url}><h3>{hit.title}</h3></Link>
		<div className="mb-4" dangerouslySetInnerHTML={{__html: hit.summary ?? ''}}></div>
		<div className="mt-4">type: <span className="italic">{hit.type}</span></div>
	</div>
)

export default HitResult
