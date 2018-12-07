import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: action.votes } ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.anecdote]
  }
  if (action.type === 'INITIALIZE') {
    return action.anecdotes
  }
  return store
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes++
    anecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      id: anecdote.id,
      votes: anecdote.votes
    })
  }
}

export const create = (anecdote) => {
  return async (dispatch) => {
    anecdote = await anecdoteService.create({ content: anecdote, votes: 0 })
    dispatch({
      type: 'CREATE',
      anecdote: anecdote
    })
  }
}

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      anecdotes: anecdotes
    })
  }
}

export default reducer