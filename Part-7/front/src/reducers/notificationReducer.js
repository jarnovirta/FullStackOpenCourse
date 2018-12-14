const reducer = (notification = {}, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.notification
  }
  if (action.type === 'CLEAR_NOTIFICATION') {
    return ''
  }
  return notification
}
export const notify = (notification, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification
    })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), time * 1000)
  }
}
export default reducer