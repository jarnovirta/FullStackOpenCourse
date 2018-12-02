import React from 'react'

const Notification = ({ message }) =>{
    const style = {
        display: message !== null ? '' : 'none',
        backgroundColor: '#DC143C',
        color: 'white',
        height: 30
    }
    return (
        <div style={style}>
            <p>{message}</p>
        </div>
    )
}
export default Notification