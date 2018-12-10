import React from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { login, logout } from './reducers/userReducer'
import { initialize, create, like } from './reducers/blogReducer'


class App extends React.Component {

  componentDidMount() {
    this.props.initialize()
    const userString = window.localStorage.getItem('loggedInBlogAppUser')
    if (userString !== null) {
      this.props.login(JSON.parse(userString))

    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    const username = this.props.user.username
    this.props.logout()
    this.props.notify({ text: `user ${username} logged out`, type: 'success' }, 5)
  }

  render() {
    const showWhenLoggedIn = {
      display: this.props.user !== null ? '' : 'none'
    }
    const showWhenNotLoggedIn = { display: this.props.user !== null ? 'none' : '' }
    const username = this.props.user ? this.props.user.username : ''

    return (
      <div>
        <Notification />
        <div style={showWhenNotLoggedIn}>
          <Login />
        </div>
        <div className="blogs" style={showWhenLoggedIn}>
          <h2>blogs</h2>
          <div>{username} logged in <button onClick={this.logout}>logout</button></div>
          <BlogList />
          <CreateBlog submitHandler={this.createBlogHandler} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blog,
    user: state.user
  }
}
const mapDispatchersToProps = {
  notify, initialize, create, like, login, logout
}
export default connect(mapStateToProps, mapDispatchersToProps)(App)
