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
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Nav, NavItem, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

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
    const Menu = () => (
      <div>
        <Nav bsStyle="pills">
          <LinkContainer exact to="/">
            <NavItem eventKey={1}>Blogs</NavItem>
          </LinkContainer>
          <LinkContainer to="/users">
            <NavItem eventKey={2}>Users</NavItem>
          </LinkContainer>
        </Nav>

      </div>
    )
    return (
      <div className="container">
        <Notification />
        <div style={showWhenNotLoggedIn}>
          <Login />
        </div>
        <div className="blogs" style={showWhenLoggedIn}>
          <div className="pull-right">
                {username} logged in <Button className="btn btn-default"
                  onClick={this.logout}>logout</Button>
              </div>
          <h2>Blog App</h2>
          <Router>
            <div>
              <Menu />
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
