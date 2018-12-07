import React from 'react'
import { create } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from './../services/anecdotes'

const AnecdoteForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const anecdote = await anecdoteService.create({ content: content, votes: 0 })
    props.create(anecdote)
    props.notify(`you added '${anecdote.content}'`)
  }

  return (
  <div>
  <h2>create new</h2>
    <form onSubmit={handleSubmit}>
      <div><input name='anecdote'/></div>
      <button>create</button>
    </form>
  </div>
  )
}

const mapDispatchToProps = {
  create, notify
}
const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
  )(AnecdoteForm)

export default ConnectedAnecdoteForm
