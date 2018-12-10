import React from 'react'
import Blog from './Blog'
import { initialize, like, remove } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'

class BlogList extends React.Component {
    componentDidMount() {
        this.props.initialize()
    }

    likeBlogHandler = (blog) => { return async () => {
    try {
        this.props.like(blog)
    }
    catch (error) {
        this.showMessage(`failed to like blog (code ${error.response.status})!`, 'error')
    }}
    }
    showMessage = (message, type) => {
    this.props.notify({ text: message, type: type }, 5)

    }
    deleteBlogHandler = (blog) => { return async () => {
        if (!window.confirm(`delete '${blog.title}' by ${blog.author}?`)) return
        this.props.remove(blog)
        this.showMessage(`deleted blog ${blog.title}`)
        }
    }

    render () {
        const isByCurrentUser = (blog) => {
            return this.props.user === null ? false : !blog.user ? true : this.props.user.id === blog.user.id
        }
        const orderBlogs = (blogs) => blogs.sort((a, b) => a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0)
        return (
            <div>
                {orderBlogs(this.props.blogs).map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        likeHandler={this.likeBlogHandler}
                        deleteHandler={this.deleteBlogHandler}
                        isByCurrentUser={isByCurrentUser(blog)}
                    />
                )}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        blogs: state.blog,
        user: state.user
    }
}
const mapDispatchersToProps = {
    notify, initialize, like, remove
}
export default connect(mapStateToProps, mapDispatchersToProps)(BlogList)
