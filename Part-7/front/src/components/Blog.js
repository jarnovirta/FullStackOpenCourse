import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired
  }

  render () {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle}>
        <div className="clickableTitle">
          <Link to={`/blogs/${this.props.blog.id}`}>
            {this.props.blog.title} {this.props.blog.author}
          </Link>
        </div>
      </div>
    )
  }
}
export default Blog