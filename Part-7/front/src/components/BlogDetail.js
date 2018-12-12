import React from 'react'
import PropTypes from 'prop-types'
import { initialize, like, remove } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'

class BlogDetail extends React.Component  {
    // = ({ blog, likeHandler, deleteHandler, deletable }) =>
    deleteHandler = () => { return async () => {
        const blog = this.props.blog
        if (!window.confirm(`delete '${blog.title}' by ${blog.author}?`)) return
        this.props.remove(blog)
        this.showMessage(`deleted blog ${blog.title}`)
        }
    }

    likeHandler = () => { return async () => {
        try {
            this.props.like(this.props.blog)
        }
        catch (error) {
            this.showMessage(`failed to like blog (code ${error.response.status})!`, 'error')
        }}
    }
    showMessage = (message, type) => {
        this.props.notify({ text: message, type: type }, 5)
    }
    isByCurrentUser = (blog) => {
        return this.props.user === null ? false : !blog.user ? true : this.props.user.id === blog.user.id
    }
    render() {
        const style = { display: this.props.blog ? '' : 'none' }
        const href = `http://${this.props.blog.url}`
        const showDeleteButton = { display: this.props.user ? '' : 'none' }

        return (
            <div style={style}>
                <h2>{this.props.blog.title}</h2>
                <a href={href}>{this.props.blog.url}</a><br />
                <div className="likes">{this.props.blog.likes}&nbsp;<button onClick={this.likeHandler()}>like</button></div>
                <div>added by {this.props.blog.user ? this.props.blog.user.name : ''}</div>
                <button style={showDeleteButton} onClick={this.deleteHandler()}>delete</button>
            </div>
        )
    }
}
BlogDetail.propTypes = {
    blog: PropTypes.object.isRequired,
    likeHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    deletable: PropTypes.bool.isRequired
  }
const mapStateToProps = (state, ownProps) => {
    const findBlogById = (id) => state.blog.find(blog => blog.id === id)
    return {
        blog: findBlogById(ownProps.blogId) || {},
        user: state.user.loggedInUser
    }
}
const mapDispatchersToProps = {
    notify, initialize, like, remove
}
export default connect(mapStateToProps, mapDispatchersToProps)(BlogDetail)