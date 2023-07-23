import Card from 'react-bootstrap/Card'
import './App.css'
import UserSearch from './modules/user-search/UserSearch'

function App() {
  return (
    <>
      <Card>
        <Card.Header>
          <i className="fa-brands fa-github github-icon mb-2"></i>
          <Card.Title as={'h3'}>Search Github Users</Card.Title>
        </Card.Header>
        <Card.Body>
          <UserSearch />
        </Card.Body>
      </Card>
    </>
  )
}

export default App
