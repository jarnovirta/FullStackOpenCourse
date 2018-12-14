import React from 'react'
import { comment } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import { notify } from './../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const formHandler = (blog, commentDispatcher, notify) => (event) => {
  event.preventDefault()
  const comment = event.target.comment.value
  commentDispatcher(blog, comment)
  event.target.comment.value = ''
  notify({ text: `comment '${comment}' added to blog ${blog.title}`, type: 'success' }, 5)
}

const Comments = ({ blog, comment, notify }) => {
  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {blog.comments ? blog.comments.map(comment => <li key={uuidv1()}>{comment}</li>) : []}
      </ul>
      <form onSubmit={formHandler(blog, comment, notify)}>
        <input type="text" name="comment" />
        <Button type="submit">add comment</Button>
      </form>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    notification: state.notification
  }
}
const mapDispatchersToProps = {
  comment, notify
}
export default connect(mapStateToProps, mapDispatchersToProps)(Comments)