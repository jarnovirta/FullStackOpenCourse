import React from 'react'

const BlogDetail = ({ blog, likeHandler, deleteHandler, deletable }) => {
    const detailStyle = { marginLeft: 10 }
    const href = `http://${blog.url}`
    const showDeleteButton = { display: deletable ? '' : 'none' }
    return (
        <div style={detailStyle}>
            <a href={href}>{blog.url}</a><br />
            {blog.likes}&nbsp;<button onClick={likeHandler(blog)}>like</button>
            <div>added by {blog.user ? blog.user.name : ''}</div>
            <button style={showDeleteButton} onClick={deleteHandler(blog)}>delete</button>
        </div>
    )
}
export default BlogDetail