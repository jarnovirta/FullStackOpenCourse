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
      error: null
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
    console.log('logging in with', this.state.username, this.state.password)
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password })

    if (user === null) {
      this.setState({
        username: '',
        password: '',
        error: 'login failed!'
      })
      setTimeout(() => this.setState({ error: null}), 5000)
    }
    else {
      this.setState({
        username: '',
        password: '',
        user: user})
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
    }
  }

  loginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    this.setState({ user: null })
  }

  createBlogHandler = async (blog) => {
    try {
      blog = await blogService.create(blog, this.state.user.token)
      this.setState({ blogs : this.state.blogs.concat(blog) })
    }
    catch (error) {
      this.setState({ error: 'failed to add blog!'})
    }
  }

  render() {
    return (
      <div>
        <Notification message={this.state.error} />
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
