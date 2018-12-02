import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  login = async (event) => {
    event.preventDefault()
    console.log('logging in with', this.state.username, this.state.password)
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password })
    console.log(user.username, user.token)
    this.setState({
      username: '',
      password: '',
      user: user})
  }
  loginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        {this.state.user === null ?
          <Login inputHandler={this.loginFieldChange}
            loginHandler={this.login}
            username={this.state.username}
            password={this.state.password}/>
          :
          <div>
            <h2>blogs</h2>
            {this.state.blogs.map(blog =>
              <Blog key={blog.id} blog={blog}/>
            )}
          </div>
        }
      </div>
    );
  }
}

export default App;
