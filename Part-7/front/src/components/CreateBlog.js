import React from 'react'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import { create } from './../reducers/blogReducer'

class CreateBlog extends React.Component {
    formHandler = async (event) => {
        event.preventDefault()

        let blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }
        event.target.title.value = event.target.author.value = event.target.url.value = ''

        try {
            await this.props.create(blog)
            this.props.notify({ text: `a new blog '${blog.title}' by ${blog.author} added`, type: 'success' }, 5)
          }
          catch (error) {
            this.props.notify({ text: `failed to add blog (code ${error.response.status})!`, type: 'error' }, 5)
          }
    }

    render () {
        return (
            <div>
                <form onSubmit={this.formHandler}>
                    title
                    <input
                        type="text"
                        name="title" />
                    <br />

                    author
                    <input
                        type="text"
                        name="author" />
                    <br />

                    url
                    <input
                        type="text"
                        name="url" />
                    <br />
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

const mapDispatchersToProps = {
    notify, create
}
export default connect(null, mapDispatchersToProps)(CreateBlog)
