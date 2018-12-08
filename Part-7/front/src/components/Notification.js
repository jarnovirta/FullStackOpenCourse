import React from 'react'

const Notification = ({ message }) => {
    const color = message.type === 'error' ? '#DC143C' : 'green'
    const style = {
        display: message.text ? '' : 'none',
        border: 'solid',
        borderColor: color,
        color: color,
        height: 30,
        padding: 15
    }

    return (
        <div style={style}>
            <p>{message.text}</p>
        </div>
    )
}
export default Notification