import React from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import BlogDetail from './components/BlogDetail'
import UserList from './components/UserList'
import User from './components/User'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { login, logout } from './reducers/userReducer'
import { initialize as initializeBlogs, create, like } from './reducers/blogReducer'
import { initialize as initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class App extends React.Component {
  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initializeUsers()
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
          <h2>blog app</h2>
          <Router>
            <div>
              <Link to="/">blogs</Link>&nbsp;
              <Link to="/users">users</Link>&nbsp;
              {username} logged in <button onClick={this.logout}>logout</button>

              <Route exact path="/" render={
                () => (
                    <div>
                      <BlogList />
                      <CreateBlog submitHandler={this.createBlogHandler} />
                    </div>
                  )
              }>
              </Route>
              <Route exact path="/users" render={() => <UserList /> } />
              <Route path="/users/:id" render={({ match }) => <User userId={match.params.id} /> } />
              <Route path="/blogs/:id" render={({ match }) => <BlogDetail blogId={match.params.id} />} />
            </div>
          </Router>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blog,
    user: state.user.loggedInUser,
    users: state.user.users
  }
}
const mapDispatchersToProps = {
  notify, initializeBlogs, create, like, login, logout, initializeUsers
}
export default connect(mapStateToProps, mapDispatchersToProps)(App)
