import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'


class BlogList extends React.Component {
    render () {
        const orderBlogs = (blogs) => blogs.sort((a, b) => a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0)
        return (
            <div>
                {orderBlogs(this.props.blogs).map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                    />
                )}
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
