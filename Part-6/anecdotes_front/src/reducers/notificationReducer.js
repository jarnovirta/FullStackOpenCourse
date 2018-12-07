const reducer = (store = '', action) => {
    if (action.type==='SET_NOTIFICATION') {
      return action.notification
    }
    if (action.type === 'CLEAR') {
      return ''
    }

    return store
}
export const notify = (notification, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification
    })
    setTimeout(() => dispatch({ type: 'CLEAR' }), time * 1000)
  }
}
export default reducer