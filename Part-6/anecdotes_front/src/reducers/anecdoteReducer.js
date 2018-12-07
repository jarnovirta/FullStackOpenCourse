const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.anecdote]
  }
  if (action.type === 'INITIALIZE') {
    return action.anecdotes
  }
  return store
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const create = (anecdote) => {
  return {
    type: 'CREATE',
    anecdote: anecdote
  }
}

export const initialize = (anecdotes) => {
  return {
    type: 'INITIALIZE',
    anecdotes: anecdotes
  }
}

export default reducer