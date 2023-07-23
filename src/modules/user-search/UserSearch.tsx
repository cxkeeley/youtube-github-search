import { FC, useEffect, useState } from 'react'
import { UserModel } from '../../model/userModel'
import { useQuery } from 'react-query'
import { UserQuery, githubAPI } from '../../api/api'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'
import UserRepository from '../user-repository/UserRepository'

const UserSearch: FC = () => {
  const [value, setValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState<Array<UserModel>>([])

  const query: UserQuery = {
    q: searchTerm,
    per_page: 5,
    page: 1,
  }

  const {
    data: userRes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => githubAPI.getUser(query),
    enabled: searchTerm !== '',
  })

  const fetchUsers = () => {
    setSearchTerm(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchUsers()
    }
  }

  useEffect(() => {
    if(userRes) {
      setUsers(userRes.items)
    }
  }, [userRes])

  return (
    <Row>
      <Col xl={12} className="mb-3">
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Search users'
          className='user-input'
        />
      </Col>
      <Col xl={12} className='mb-3'>
        <Button onClick={() => fetchUsers()}>Search Users!</Button>
      </Col>

      <Accordion>
        {users.map((user) => (
          <UserRepository user={user} />
        ))}
      </Accordion>

      {isLoading ? (
        <div>
          <Spinner 
            animation="border"
            variant="primary"
            style={{ width: '1.5rem', height: '1.5rem'}}
          />
        </div>
      ) : null}

      {error ? (
        <div>
          <p>No users found!</p>
        </div>
      ) : null}
    </Row>
  )
}

export default UserSearch