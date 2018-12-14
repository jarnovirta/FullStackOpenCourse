import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        <div>
          <Link to={`/blogs/${this.props.blog.id}`}>
            {this.props.blog.title} {this.props.blog.author}
          </Link>
        </div>
      </div>
    )
  }
}
export default Blog