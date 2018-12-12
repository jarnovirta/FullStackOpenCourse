import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class User extends React.Component {
    render () {
        const getPath = (id) => `/blogs/${id}`
        return (
            <div>
                <h1>{this.props.user.name}</h1>
                <h2>Added blogs</h2>
                <ul>
                    {this.props.user.blogs ? this.props.user.blogs.map(blog => <li key={blog._id}>
                    <Link to={getPath(blog._id)}>
                        {blog.title}
                    </Link></li>)
                    : []}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const user = state.user.users.find(user => {
        return user.id === ownProps.userId})
        || {}
    return {
        user: user
      }
}

export default connect(mapStateToProps)(User)