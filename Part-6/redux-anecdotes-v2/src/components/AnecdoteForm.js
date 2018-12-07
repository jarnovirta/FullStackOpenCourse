import React from 'react'
import { create } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    props.create(content)
    props.notify(`you added '${content}'`)
    e.target.anecdote.value = ''
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
