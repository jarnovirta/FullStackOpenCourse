import React from 'react'
import { clearNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {
  componentDidUpdate() {
    if (this.props.notification.length > 0) {
      setTimeout(() => this.props.clearNotification(), 5000)
    }
  }
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      display: this.props.notification.length > 0 ?
        '' : 'none'
    }
    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}
const mapDispatchToProps = {
  clearNotification
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notification)
export default ConnectedNotification
