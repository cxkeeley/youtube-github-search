import { FC } from 'react'
import { RepoModel } from '../../../model/repoModel'

type Props = {
  repo: RepoModel
}

const RepositoryCard: FC<Props> = ({ repo }) => {
  return (
    <div className="mb-2">
      <div className="d-flex justify-content-between text-start fw-bold">
        <div>{repo?.name}</div>
        <div className="d-flex align-items-center">
          <div>{repo?.stargazers_count ?? '-'}</div>
          <i className="fa-solid fa-star ms-1"></i>
        </div>
      </div>
      <div className="text-start">
        <div>{repo.description}</div>
      </div>
    </div>
  )
}

export default RepositoryCard
