import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initialize } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  async componentDidMount() {
    const anecdotes = await anecdoteService.getAll()
    this.props.initialize(anecdotes)
  }
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

const mapDispatchersToProps = {
  initialize
}

export default connect(null, mapDispatchersToProps)(App)