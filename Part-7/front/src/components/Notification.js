import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    const color = props.notification.type === 'error' ? '#DC143C' : 'green'
    const style = {
        display: props.notification.text ? '' : 'none',
        border: 'solid',
        borderColor: color,
        color: color,
        height: 30,
        padding: 15
    }

    return (
        <div style={style}>
            <p>{props.notification.text}</p>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}
const ConnectedNotification = connect(
    mapStateToProps
)(Notification)
export default ConnectedNotification