import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
    render () {
        const style = { display: this.props.user ? '' : 'none'}
        const name = this.props.user ? this.props.user.name : ''
        const blogs = this.props.user ? this.props.user.blogs : []
        return (
            <div style={style}>
                <h1>{name}</h1>
                <h2>Added blogs</h2>
                <ul>
                    {blogs.map(blog => <li key={blog._id}>{blog.title}</li>)}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const user = state.user.users.find(user => {
        return user.id === ownProps.userId}
        )
    return {
        user: user
      }
}

export default connect(mapStateToProps)(User)