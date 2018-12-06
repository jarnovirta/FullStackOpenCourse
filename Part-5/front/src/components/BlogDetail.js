import React from 'react'
import PropTypes from 'prop-types'

const BlogDetail = ({ blog, likeHandler, deleteHandler, deletable }) => {
    const detailStyle = { marginLeft: 10 }
    const href = `http://${blog.url}`
    const showDeleteButton = { display: deletable ? '' : 'none' }
    return (
        <div style={detailStyle}>
            <a href={href}>{blog.url}</a><br />
            <div className="likes">{blog.likes}&nbsp;<button onClick={likeHandler(blog)}>like</button></div>
            <div>added by {blog.user ? blog.user.name : ''}</div>
            <button style={showDeleteButton} onClick={deleteHandler(blog)}>delete</button>
        </div>
    )
}
BlogDetail.propTypes = {
    blog: PropTypes.object.isRequired,
    likeHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    deletable: PropTypes.bool.isRequired
  }
export default BlogDetail