import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

class BlogList extends React.Component {
  static propTypes = {
    blogs: PropTypes.array.isRequired
  }
  render() {
    const orderBlogs = (blogs) => blogs.sort((a, b) => a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0)
    return (
      <div>
        <br />
        <ListGroup>
          {orderBlogs(this.props.blogs).map(blog =>
            <ListGroupItem key={blog.id}>
              <Blog
                blog={blog}
              />
            </ListGroupItem>
          )}

        </ListGroup>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blog
  }
}

export default connect(mapStateToProps)(BlogList)
