import { FC, useEffect, useState } from 'react'
import { UserModel } from '../../model/userModel'
import { RepoModel } from '../../model/repoModel'
import { RequestQuery, githubAPI } from '../../api/api'
import { useInfiniteQuery } from 'react-query'
import Accordion from 'react-bootstrap/Accordion'
import RepositoryCard from './components/RepositoryCard'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

type Props = {
  user: UserModel
}

const UserRepository: FC<Props> = ({ user }) => {
  const [repos, setRepos] = useState<Array<RepoModel>>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const PER_PAGE = 5

  const query: RequestQuery = {
    per_page: PER_PAGE,
    page: currentPage,
  }

  const {
    data: repoRes,
    error: repoError,
    isLoading: isRepoLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['repo', user.login],
    queryFn: ({ pageParam = 1 }) =>
      githubAPI.getRepo(user.login, {
        ...query,
        page: pageParam,
      }),
    getNextPageParam: () => currentPage + 1,
  })

  useEffect(() => {
    if (repoRes) {
      const allRepos = repoRes.pages.flatMap((page) => page)
      const newRepos = allRepos.slice(-5)
      setRepos((prevRepos) => [...prevRepos, ...newRepos])
    } else {
      if (user) {
        setRepos([])
        setCurrentPage(1)
      }
    }
  }, [repoRes, user])

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1)
    fetchNextPage()
  }

  return (
    <Accordion.Item key={user?.id} eventKey={user?.id.toString()}>
      <Accordion.Header>{user?.login}</Accordion.Header>
      <Accordion.Body>
        <div className="h-100 d-flex flex-column mb-3">
          <div
            className="h-100px d-flex flex-grow-1 overflow-y-auto flex-column"
            style={{ maxHeight: '300px' }}
          >
            {repos?.map((repo) => (
              <RepositoryCard repo={repo} />
            ))}

            {isRepoLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{ width: '1.5rem', height: '1.5rem' }}
                />
              </div>
            ) : null}

            {repoError ? (
              <div>
                <p>No Repository Found!</p>
              </div>
            ) : null}
          </div>
        </div>

        {hasNextPage && !isRepoLoading ? (
          <Button onClick={handleShowMore} disabled={!hasNextPage}>
            Show More!
          </Button>
        ) : null}
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default UserRepository
