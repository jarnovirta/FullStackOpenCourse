import React from 'react'
import Comments from './Comments'
import { initialize, like, remove } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'

class BlogDetail extends React.Component  {
  deleteHandler = () => {
    return async () => {
      const blog = this.props.blog
      if (!window.confirm(`delete '${blog.title}' by ${blog.author}?`)) return
      await this.props.remove(blog)
      this.showMessage(`deleted blog ${blog.title}`)
      this.props.history.goBack()
    }
  }
  likeHandler = () => {
    return async () => {
      try {
        this.props.like(this.props.blog)
      }
      catch (error) {
        this.showMessage(`failed to like blog (code ${error.response.status})!`, 'error')
      }
    }
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
        <h3>{this.props.blog.title}</h3>
        <a href={href}>{this.props.blog.url}</a><br />
        <div>added by {this.props.blog.user ? this.props.blog.user.name : ''}</div>
        <div className="likes">{this.props.blog.likes}&nbsp;<Button onClick={this.likeHandler()}>like</Button></div>
        <Button className="btn btn-danger" style={showDeleteButton} onClick={this.deleteHandler()}>delete</Button>
        <Comments blog={this.props.blog} />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const findBlogById = (id) => state.blog.find(blog => blog.id === id)
  return {
    blog: findBlogById(ownProps.blogId) || {},
    user: state.user.loggedInUser,
    history: ownProps.history
  }
}
const mapDispatchersToProps = {
  notify, initialize, like, remove
}
export default withRouter(connect(mapStateToProps, mapDispatchersToProps)(BlogDetail))