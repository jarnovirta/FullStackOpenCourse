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

  setUser = (user) => {
    this.setState({ user: user })
    blogService.setToken(user === null ? null : user.token)
  }
  setBlogs = (blogs) => {
    this.setState({
      blogs: blogs.sort((a, b) =>
        a.likes > b.likes ? 1 : a.likes < b.likes ? -1 : 0
      )})
  }
  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setBlogs(blogs)
    )
    const userString = window.localStorage.getItem('loggedInBlogAppUser')
    if (userString !== null) {
      this.setUser(JSON.parse(userString))
    }
  }

  login = async (event) => {
    event.preventDefault()
    let user
    try {
      user = await loginService.login({
        username: this.state.username,
        password: this.state.password })
      this.setState({
          username: '',
          password: ''
      })
    }
    catch (error) {
      if (error.response.status === 401) {
        this.showMessage('wrong username or password', 'error')
      }
      else this.showMessage(`an error occurred (code ${error.response.status})`, 'error')
      return
    }
    this.setUser(user)
    window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
    this.showMessage(`user ${user.username} logged in`, 'success')
  }

  loginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    this.setUser(null)
    this.showMessage(`user ${this.state.user.username} logged out`, 'success')
  }

  createBlogHandler = async (blog) => {
    try {
      blog = await blogService.create(blog)
      this.setBlogs(this.state.blogs.concat(blog))
      this.showMessage(`a new blog '${blog.title}' by ${blog.author} added`, 'success')
    }
    catch (error) {
      this.showMessage(`failed to add blog (code ${error.response.status})!`, 'error')
    }
  }
  likeBlogHandler = (blog) => { return async () => {
    try {
      blog.likes++
      const updatedBlog = await blogService.update(blog)
      this.setBlogs(this.state.blogs.map((listedBlog) =>
        listedBlog.id === updatedBlog.id ? updatedBlog : listedBlog ))
    }
    catch (error) {
      this.showMessage(`failed to like blog (code ${error.response.status})!`, 'error')
    }}
  }
  deleteBlogHandler = (blog) => { return async () => {
    if (!window.confirm(`delete '${blog.title}' by ${blog.author}?`)) return
    try {
      await blogService.remove(blog)
      this.setBlogs(this.state.blogs.filter((listedBlog) =>
        listedBlog.id === blog.id ? false : true ))
    }
    catch (error) {
      this.showMessage(`failed to delete blog (code ${error.response.status})!`, 'error')
    }}
  }
  showMessage = (message, type) => {
    this.setState({ message: { text: message, type: type }})
    setTimeout(() => this.setState({ message: {} }), 5000)
  }
  render() {
    const showWhenLoggedIn = { display: this.state.user !== null ? '' : 'none' }
    const showWhenNotLoggedIn = { display: this.state.user !== null ? 'none' : '' }
    const username = this.state.user ? this.state.user.username : ''
    const isByCurrentUser = (blog) => !this.state.user ? false : !blog.user ? true : this.state.user.id === blog.user.id
    return (
      <div>
        <Notification message={this.state.message} />
        <div style={showWhenNotLoggedIn}>
          <Login inputHandler={this.loginFieldChange}
            loginHandler={this.login}
            username={this.state.username}
            password={this.state.password} />
        </div>
        <div style={showWhenLoggedIn}>
          <h2>blogs</h2>
          <div>{username} logged in <button onClick={this.logout}>logout</button></div>
          {this.state.blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likeHandler={this.likeBlogHandler}
              deleteHandler={this.deleteBlogHandler}
              isByCurrentUser={isByCurrentUser(blog)}/>
          )}
          <CreateBlog submitHandler={this.createBlogHandler} />
        </div>
      </div>
    );
  }
}
export default App;
