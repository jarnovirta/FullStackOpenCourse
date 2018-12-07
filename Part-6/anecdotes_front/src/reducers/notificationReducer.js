const reducer = (store = '', action) => {
    if (action.type==='SET_NOTIFICATION') {
      return action.notification
    }
    if (action.type === 'CLEAR') {
      return ''
    }

    return store
}
export const notify = notification =>  {
  return {
  type: 'SET_NOTIFICATION',
  notification: notification
  }
}
export const clearNotification = () => { return { type: 'CLEAR' }}

export default reducer