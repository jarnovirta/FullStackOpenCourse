import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {
    const isByCurrentUser = (blog) => {
        console.log("CURRENT USER ", props.currentUserId)
        console.log("BLOG USER ", blog.user.id)
        return props.currentUserId !== null ? false : !blog.user ? true : props.currentUserId === blog.user.id
    }
    return (
        <div>
            {props.blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    likeHandler={props.likeBlogHandler}
                    deleteHandler={props.deleteHandler}
                    isByCurrentUser={isByCurrentUser(blog)}
                />
            )}
        </div>
    )
}
export default BlogList