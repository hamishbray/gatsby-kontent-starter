import React from 'react'
import { Link } from 'gatsby'
import { Hit } from 'react-instantsearch-core'

type Props = {
  hit: Hit<{
    summary?: string
    title: string
    type: string
    url: string
    imageUrl: string
  }>
}

const HitResult: React.FC<Props> = ({ hit }: Props) => (
  <Link to={hit.url} className="self-start px-6 pt-2 pb-6 hover:no-underline">
    <h3 className="hover:underline">{hit.title}</h3>
    <div className="mb-4">
      <img src={hit.imageUrl} alt={hit.title} />
    </div>
    <div
      className="mb-4"
      dangerouslySetInnerHTML={{ __html: hit.summary ?? '' }}
    ></div>
    <div className="mt-4">
      type: <span className="italic">{hit.type}</span>
    </div>
  </Link>
)

export default HitResult
