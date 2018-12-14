import React from 'react'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import { create } from './../reducers/blogReducer'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class CreateBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
  }
  static propTypes = {
    create: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  formHandler = async (event) => {
    event.preventDefault()

    let blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    this.toggleForm()
    event.target.title.value = event.target.author.value = event.target.url.value = ''

    try {
      await this.props.create(blog)
      this.props.notify({ text: `a new blog '${blog.title}' by ${blog.author} added`, type: 'success' }, 5)
    }
    catch (error) {
      this.props.notify({ text: `failed to add blog (code ${error.response.status})!`, type: 'error' }, 5)
    }
  }

  render() {
    const formStyle = { display: this.state.showForm ? '' : 'none' }
    const toggleButtonStyle = { display: this.state.showForm ? 'none' : '' }
    return (
      <div>
        <div style={formStyle}>
          <form onSubmit={this.formHandler}>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl type="text" name="title" placeholder="Enter title" />

              <ControlLabel>Author</ControlLabel>
              <FormControl type="text" name="author" placeholder="Enter author's name" />

              <ControlLabel>URL</ControlLabel>
              <FormControl type="text" name="url" placeholder="Enter URL" />
            </FormGroup>
            <br />
            <Button type="submit" className="btn btn-success">Create</Button>
            <Button onClick={this.toggleForm} className="btn btn-default">Cancel</Button>
          </form>
        </div>
        <div style={toggleButtonStyle}>
          <Button onClick={this.toggleForm}>Create blog</Button>
        </div>
      </div>
    )
  }
}

const mapDispatchersToProps = {
  notify, create
}
export default connect(null, mapDispatchersToProps)(CreateBlog)
