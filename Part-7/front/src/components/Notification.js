import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
    const alertStyle = props.notification.type === 'error' ? 'danger' : 'success'
    const showAlertStyle = { display: props.notification.text ? '' : 'none' }
    return (
        <div style={showAlertStyle}>
            <Alert bsStyle={alertStyle}>
                <p>{props.notification.text}</p>
            </Alert>
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