import React from 'react'
import { Link } from 'gatsby'
import { DomElement } from 'html-react-parser'

export type LinkItem = {
	type: string
	url_slug: string
	link_id: string
	codename: string
}

type Props = {
	type: string
	url_slug: string
	domNode: DomElement
}

const LinkedLink: React.FC<Props> = ({ type, url_slug, domNode }: Props) => (
	<Link to={`/${type}/${url_slug}`}>{domNode.children[0].data}</Link>
)

export default LinkedLink
