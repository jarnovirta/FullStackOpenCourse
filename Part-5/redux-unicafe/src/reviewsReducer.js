const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const counterReducer = (state = initialState, action) => {
    console.log(action)
    let newState
    switch (action.type) {
        case 'GOOD':
            newState = { ...state, good: state.good++ }
            return newState
        case 'OK':
            newState = { ...state, good: state.ok++ }
            return newState
        case 'BAD':
            newState = { ...state, good: state.bad++ }
            return newState
        case 'ZERO':
            newState = { ...initialState }
            return newState
        default:
            return state
    }
  }

  export default counterReducer