import React from 'react'
import { login, logout } from './../reducers/userReducer'
import { notify } from './../reducers/notificationReducer'
import loginService from './../services/login'
import { connect } from 'react-redux'

class Login extends React.Component {
    login = async (event) => {
        event.preventDefault()
        let user
        try {
          const username = event.target.username.value
          const password = event.target.password.value
          event.target.username.value = ''
          event.target.password.value = ''
          user = await loginService.login({ username, password })
        }

        catch (error) {
          if (error.response.status === 401) {
            this.showMessage('wrong username or password', 'error')
          }
          else this.showMessage(`an error occurred (code ${error.response.status})`, 'error')
          return
        }
        this.props.login(user)
        window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
        this.showMessage(`user ${user.username} logged in`, 'success')
    }


    showMessage = (message, type) => {
        this.props.notify({ text: message, type: type }, 5)
      }
    render () {
    return (
        <div>
            <h2>Kirjaudu</h2>
            <form onSubmit={this.login}>
                <div>
                    käyttäjätunnus
                    <input name="username"
                        type="text"
                    />
                </div>
                <div>
                    salasana
                    <input name="password"
                        type="password"
                    />
                </div>
                <button type="submit">Kirjaudu</button>
            </form>
        </div>
        )
    }
}


const mapDispatchersToProps = {
    login, logout, notify
}
export default connect(null, mapDispatchersToProps)(Login)
