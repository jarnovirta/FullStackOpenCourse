import React from 'react'

class CreateBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
        this.submitHandler = props.submitHandler
    }
    inputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })

    }
    formHandler = () => {
        this.submitHandler({ title: this.state.title,
            author: this.state.author,
            url: this.state.url
        })
    }

    render () {
        return (
            <div>
                <form onSubmit={this.formHandler}>
                    title
                    <input
                        type="text"
                        name="title"
                        onChange={this.inputHandler} />
                    <br />

                    author
                    <input
                        type="text"
                        name="author"
                        onChange={this.inputHandler} />
                    <br />

                    url
                    <input
                        type="text"
                        name="url"
                        onChange={this.inputHandler} />
                    <br />
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

export default CreateBlog