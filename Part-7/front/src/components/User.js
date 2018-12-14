import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class User extends React.Component {
  render() {
    const getPath = (id) => `/blogs/${id}`
    return (
      <div>
        <h3>{this.props.user.name}</h3>
        <h4>Added blogs</h4>
        <ListGroup>
          {this.props.user.blogs ?
            this.props.user.blogs
              .map(blog =>
                <ListGroupItem key={blog._id}>
                  <Link to={getPath(blog._id)}>{blog.title}</Link>
                </ListGroupItem>
              )
            : []}
        </ListGroup>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const user = state.user.users.find(user => {
    return user.id === ownProps.userId
  })
    || {}
  return {
    user: user
  }
}

export default connect(mapStateToProps)(User)