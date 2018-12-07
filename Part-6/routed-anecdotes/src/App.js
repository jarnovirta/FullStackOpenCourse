import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Alert, Nav, NavItem, FormGroup, ControlLabel,
  FormControl, Button, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = () => (
  <div>
    <Nav bsStyle="pills">
      <LinkContainer exact to="/">
        <NavItem eventKey={1}>anecdotes</NavItem>
      </LinkContainer>
      <LinkContainer to="/create">
        <NavItem eventKey={2}>create new</NavItem>
      </LinkContainer>
      <LinkContainer to="/about">
        <NavItem eventKey={3}>about</NavItem>
      </LinkContainer>
    </Nav>
  </div>
)
const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>
      )}

    </ListGroup>
  </div>
)

const About = () => {
  const imgStyle = { width: 405, height: 227}
  return (
  <div>
    <h2>About anecdote app</h2>

    <Grid>
      <Row className="show-grid">
        <Col xs={6}>
          <p>According to Wikipedia:</p>
          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>
          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={6}>
          <img style={imgStyle} src="https://i.pinimg.com/originals/0e/60/13/0e6013049ab0e97d82af1278cccdb0e9.png" />
        </Col>
      </Row>
    </Grid>
  </div>
  )
}
const Footer = () => (
  <footer>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </footer>
)

const Notification = ({ notification }) => {
  const style = { display: notification.length > 0 ? '' : 'none',
    marginTop: 10
  }
  return (
    <div style={style}>
      <Alert bsStyle="info">
        {notification}
      </Alert>
    </div>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="newAnecdote">
            <ControlLabel>content</ControlLabel>
            <FormControl type="text" name="content" placeholder="Enter anecdote" value={this.state.content} onChange={this.handleChange} />
            <ControlLabel>author</ControlLabel>
            <FormControl type="text" name="author" placeholder="Enter author" value={this.state.author} onChange={this.handleChange} />
            <ControlLabel>url for more info</ControlLabel>
            <FormControl type="text" name="info" placeholder="Enter url" value={this.state.info} onChange={this.handleChange} />
          </FormGroup>
          <Button type="submit">create</Button>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `A new anecdote ${anecdote.content} created!`
    })
    setTimeout(() => this.setState({ notification: '' }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const anecdoteById = (id) => this.state.anecdotes.find(anecdote =>
      anecdote.id === id
    )
    return (
      <div className="container">
          <h1>Software anecdotes</h1>
          <Router>
            <div>
              <Menu />
              <Notification notification={this.state.notification} />
              <Route exact path="/" render={() =><AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/anecdotes/:id" render={({match}) => {
                return <Anecdote anecdote={anecdoteById(match.params.id)} />}
                }
              />
              <Route path="/about" render={() =><About />} />
              <Route path="/create" render={({history}) =>
                <CreateNew
                  history={history}
                  addNew={this.addNew} />} />
            </div>
        </Router>

      <Footer />
      </div>
    );
  }
}

export default App;
