import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      message: {}
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const userString = window.localStorage.getItem('loggedInBlogAppUser')
    if (userString !== null) {
      this.setState({user: JSON.parse(userString) })
    }
  }

  login = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password })

    if (!user) {
      this.setState({
        username: '',
        password: ''
      })
      this.showMessage(`wrong username or password`, 'error')
    }
    else {
      this.setState({
        username: '',
        password: '',
        user: user})
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
      this.showMessage(`user ${user.username} logged in`, 'success')
    }
  }

  loginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    this.setState({ user: null })
    this.showMessage(`user ${this.state.user.username} logged out`, 'success')

  }

  createBlogHandler = async (blog) => {
    try {
      blog = await blogService.create(blog, this.state.user.token)
      this.setState({ blogs : this.state.blogs.concat(blog) })
      this.showMessage(`a new blog '${blog.title}' by ${blog.author} added`, 'success')
    }
    catch (error) {
      this.showMessage('failed to add blog!', 'error')
    }
  }

  showMessage = (message, type) => {
    this.setState({ message: { text: message, type: type }})
    setTimeout(() => this.setState({ message: {} }), 5000)
  }
  render() {
    return (
      <div>
        <Notification message={this.state.message} />
        {this.state.user === null ?
          <Login inputHandler={this.loginFieldChange}
            loginHandler={this.login}
            username={this.state.username}
            password={this.state.password}/>
          :
          <div>
            <h2>blogs</h2>
            <div>{this.state.user.username} logged in <button onClick={this.logout}>logout</button></div>
            {this.state.blogs.map(blog =>
              <Blog key={blog.id} blog={blog}/>
            )}
            <CreateBlog submitHandler={this.createBlogHandler} />
          </div>
        }
      </div>
    );
  }
}

export default App;
